export interface UpdateUserDTO {
  email?: string;
  password?: string;
}

export interface UpdatePatientDTO {
  name?: string;
  birthDate?: string; // ISO (YYYY-MM-DD)
  image?: string;
  about?: string;
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
}

export interface ApiError {
  message: string;
}
