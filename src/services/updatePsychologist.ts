// services/updatePsychologist.ts
import {
  UpdateUserDTO,
  UpdatePsychologistDTO,
  UserResponse,
  PsychologistResponse,
  ApiError,
} from "./../dtos/updatePsychologist";

export async function updatePsychologist(
  psychologistId: string,
  userData: UpdateUserDTO,
  psychologistData: UpdatePsychologistDTO
): Promise<{ user: UserResponse; psychologist: PsychologistResponse }> {
  try {
    // 1. Busca o psicólogo existente
    const psyResponse = await fetch(
      `http://localhost:3001/psychologists/${psychologistId}`
    );

    if (!psyResponse.ok) {
      throw new Error("Psicólogo não encontrado");
    }

    const existingPsychologist: PsychologistResponse = await psyResponse.json();

    // 2. Busca o usuário vinculado
    const userResponse = await fetch(
      `http://localhost:3001/users/${existingPsychologist.userId}`
    );

    if (!userResponse.ok) {
      throw new Error("Usuário não encontrado");
    }

    const existingUser: UserResponse = await userResponse.json();

    // 3. Verifica se o novo email já está em uso
    if (userData.email && userData.email !== existingUser.email) {
      const emailCheck = await fetch(
        `http://localhost:3001/users?email=${userData.email}`
      );
      const existingUsers = await emailCheck.json();
      if (existingUsers.length > 0) {
        throw new Error("Este email já está sendo usado");
      }
    }

    // 4. Verifica se o novo CRP já está em uso
    if (
      psychologistData.crp &&
      psychologistData.crp !== existingPsychologist.crp
    ) {
      const crpCheck = await fetch(
        `http://localhost:3001/psychologists?crp=${psychologistData.crp}`
      );
      const existingCRPs = await crpCheck.json();
      if (existingCRPs.length > 0) {
        throw new Error("CRP já cadastrado");
      }
    }

    // 5. Atualiza o usuário
    const updatedUserRes = await fetch(
      `http://localhost:3001/users/${existingUser.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...existingUser,
          ...userData,
        }),
      }
    );

    if (!updatedUserRes.ok) {
      const error: ApiError = await updatedUserRes.json();
      throw new Error(error.message || "Erro ao atualizar usuário");
    }

    const updatedUser: UserResponse = await updatedUserRes.json();

    // 6. Atualiza o psicólogo
    const updatedPsychologistRes = await fetch(
      `http://localhost:3001/psychologists/${psychologistId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...existingPsychologist,
          ...psychologistData,
        }),
      }
    );

    if (!updatedPsychologistRes.ok) {
      const error: ApiError = await updatedPsychologistRes.json();
      throw new Error(error.message || "Erro ao atualizar psicólogo");
    }

    const updatedPsychologist: PsychologistResponse =
      await updatedPsychologistRes.json();

    return { user: updatedUser, psychologist: updatedPsychologist };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Erro na atualização:", err.message);
    throw new Error(err.message || "Erro durante o processo de atualização");
  }
}
