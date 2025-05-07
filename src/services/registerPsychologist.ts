// services/registerPsychologist.ts
import {
  CreateUserDTO,
  CreatePsychologistDTO,
  UserResponse,
  PsychologistResponse,
  ApiError,
} from "./../dtos/registerPsychologist";

export async function registerPsychologist(
  userData: CreateUserDTO,
  psychologistData: Omit<CreatePsychologistDTO, "userId">
): Promise<{ user: UserResponse; psychologist: PsychologistResponse }> {
  try {
    // verifica se o email ja nao esta sendo utilizado
    const emailCheck = await fetch(
      `http://localhost:3001/users?email=${userData.email}`
    );
    if (!emailCheck.ok) throw new Error("Erro ao verificar email");

    const existingUsers = await emailCheck.json();
    if (existingUsers.length > 0) {
      throw new Error("Este email já está sendo usado");
    }

    // 1. Cadastra o usuário
    const userRes = await fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!userRes.ok) {
      const error: ApiError = await userRes.json();
      throw new Error(error.message || "Erro ao criar usuário");
    }

    const user: UserResponse = await userRes.json();

    // 2. Cadastra o psicólogo com o ID do usuário
    const psychologistRes = await fetch("http://localhost:3001/psychologists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...psychologistData,
        userId: user.id,
      }),
    });

    if (!psychologistRes.ok) {
      const error: ApiError = await psychologistRes.json();
      throw new Error(error.message || "Erro ao criar psicólogo");
    }

    const psychologist: PsychologistResponse = await psychologistRes.json();
    return { user, psychologist };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Erro no cadastro:", err.message);
    throw new Error(err.message || "Erro durante o processo de cadastro");
  }
}
