// services/registerPatient.ts
import {
  CreateUserDTO,
  CreatePatientDTO,
  UserResponse,
  PatientResponse,
  ApiError,
} from "../dtos/registerPatient";

export async function registerPatient(
  userData: CreateUserDTO,
  patientData: Omit<CreatePatientDTO, "userId">
): Promise<{ user: UserResponse; patient: PatientResponse }> {
  // 1. checa se email já existe
  const emailCheck = await fetch(
    `http://localhost:3001/users?email=${userData.email}`
  );
  if (!emailCheck.ok) throw new Error("Erro ao verificar email");
  const existingUsers = await emailCheck.json();
  if (existingUsers.length > 0) {
    throw new Error("Este email já está sendo usado");
  }
  // 2. cria usuário
  const userRes = await fetch("http://localhost:3001/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!userRes.ok) {
    const apiErr: ApiError = await userRes.json();
    throw new Error(apiErr.message);
  }
  const user: UserResponse = await userRes.json();
  // 3. cria paciente
  const patientRes = await fetch("http://localhost:3001/patients", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...patientData, userId: user.id }),
  });
  if (!patientRes.ok) {
    const apiErr: ApiError = await patientRes.json();
    throw new Error(apiErr.message);
  }
  const patient: PatientResponse = await patientRes.json();
  return { user, patient };
}
