import { ApiError } from "../dtos/updatePsychologist";

/**
 * Deleta um psicólogo e o usuário associado.
 * @param psychologistId ID do psicólogo a ser deletado.
 */
export async function deletePsychologist(
  psychologistId: string
): Promise<void> {
  try {
    // 1. Busca o psicólogo para obter o userId
    const psyRes = await fetch(
      `http://localhost:3001/psychologists/${psychologistId}`
    );
    if (!psyRes.ok) throw new Error("Psicólogo não encontrado");
    const { userId } = (await psyRes.json()) as { userId: string };

    // 2. Deleta o psicólogo
    const deletePsy = await fetch(
      `http://localhost:3001/psychologists/${psychologistId}`,
      { method: "DELETE" }
    );
    if (!deletePsy.ok) {
      const err: ApiError = await deletePsy.json();
      throw new Error(err.message || "Erro ao deletar psicólogo");
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
    console.error("Erro na deleção:", error.message);
    throw new Error(error.message || "Erro durante o processo de deleção");
  }
}
