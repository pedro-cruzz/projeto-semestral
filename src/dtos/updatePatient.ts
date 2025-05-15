export interface UpdateUserDTO {
  email?: string;
  password?: string;
}

export interface UpdatePatientDTO {
  name?: string;
  birthDate?: string; // ISO (YYYY-MM-DD)
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
}

export interface ApiError {
  message: string;
}
