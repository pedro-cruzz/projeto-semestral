// dtos/registerPatient.ts
export interface CreateUserDTO {
  email: string;
  password: string;
}
export interface CreatePatientDTO {
  userId: string;
  name: string;
  birthDate: string;
  // outros campos de paciente (ex.: telefone, endereço)
}
export interface UserResponse {
  id: string;
  email: string;
  password: string;
}
export interface PatientResponse {
  id: string;
  userId: string;
  name: string;
  birthDate: string;
  image?: string;
  about?: string;
  // ...
}
export interface ApiError {
  message: string;
}
