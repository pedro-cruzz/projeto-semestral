// services/deletePatient.ts
import { ApiError } from "../dtos/registerPatient";

/**
 * Deleta um paciente e o usuário associado.
 * @param patientId ID do paciente a ser deletado.
 */
export async function deletePatient(patientId: string): Promise<void> {
  try {
    // 1. Busca o paciente para obter o userId
    const patRes = await fetch(`http://localhost:3001/patients/${patientId}`);
    if (!patRes.ok) throw new Error("Paciente não encontrado");
    const { userId } = (await patRes.json()) as { userId: string };

    // 2. Deleta o paciente
    const deletePat = await fetch(
      `http://localhost:3001/patients/${patientId}`,
      { method: "DELETE" }
    );
    if (!deletePat.ok) {
      const err: ApiError = await deletePat.json();
      throw new Error(err.message || "Erro ao deletar paciente");
    }

    // 3. Deleta o usuário vinculado
    const deleteUser = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "DELETE",
    });
    if (!deleteUser.ok) {
      const err: ApiError = await deleteUser.json();
      throw new Error(err.message || "Erro ao deletar usuário associado");
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Erro na deleção de paciente:", error.message);
    throw new Error(error.message || "Erro durante o processo de deleção");
  }
}
