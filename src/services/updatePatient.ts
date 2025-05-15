// services/updatePatient.ts
import {
  UpdateUserDTO,
  UpdatePatientDTO,
  UserResponse,
  PatientResponse,
  ApiError,
} from "./../../src/dtos/updatePatient";

/**
 * Atualiza um paciente e o usuário associado.
 * @param patientId ID do paciente a ser atualizado.
 * @param userData Dados de usuário a atualizar (ex.: email, password).
 * @param patientData Dados de paciente a atualizar (ex.: name, birthDate).
 */
export async function updatePatient(
  patientId: string,
  userData: UpdateUserDTO,
  patientData: UpdatePatientDTO
): Promise<{ user: UserResponse; patient: PatientResponse }> {
  try {
    // 1. Busca o paciente existente
    const patRes = await fetch(`http://localhost:3001/patients/${patientId}`);
    if (!patRes.ok) {
      throw new Error("Paciente não encontrado");
    }
    const existingPatient: PatientResponse = await patRes.json();

    // 2. Busca o usuário vinculado
    const userRes = await fetch(
      `http://localhost:3001/users/${existingPatient.userId}`
    );
    if (!userRes.ok) {
      throw new Error("Usuário não encontrado");
    }
    const existingUser: UserResponse = await userRes.json();

    // 3. (Opcional) Verifica novo email em uso
    if (userData.email && userData.email !== existingUser.email) {
      const emailCheck = await fetch(
        `http://localhost:3001/users?email=${userData.email}`
      );
      const found = await emailCheck.json();
      if (found.length > 0) {
        throw new Error("Este email já está sendo usado");
      }
    }

    // 4. Atualiza o usuário
    const updatedUserRes = await fetch(
      `http://localhost:3001/users/${existingUser.id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...existingUser, ...userData }),
      }
    );
    if (!updatedUserRes.ok) {
      const err: ApiError = await updatedUserRes.json();
      throw new Error(err.message || "Erro ao atualizar usuário");
    }
    const updatedUser: UserResponse = await updatedUserRes.json();

    // 5. Atualiza o paciente
    const updatedPatientRes = await fetch(
      `http://localhost:3001/patients/${patientId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...existingPatient, ...patientData }),
      }
    );
    if (!updatedPatientRes.ok) {
      const err: ApiError = await updatedPatientRes.json();
      throw new Error(err.message || "Erro ao atualizar paciente");
    }
    const updatedPatient: PatientResponse = await updatedPatientRes.json();

    return { user: updatedUser, patient: updatedPatient };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Erro na atualização de paciente:", err.message);
    throw new Error(err.message || "Erro durante o processo de atualização");
  }
}
