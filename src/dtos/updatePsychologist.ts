export interface UpdateUserDTO {
  email?: string;
  password?: string;
}

export interface UpdatePsychologistDTO {
  name?: string;
  crp?: string;
  birthDate?: string;
  activitiesStartDate?: string;
  about?: string | null;
  image?: string;
  specialization?: string[];
}

export interface UserResponse {
  id: string;
  email: string;
  password: string;
}

export interface PsychologistResponse {
  id: string;
  userId: string;
  name: string;
  crp: string;
  birthDate: string;
  activitiesStartDate: string;
  about?: string | null;
  image?: string;
  specialization?: string[];
}

export interface ApiError {
  message: string;
}
