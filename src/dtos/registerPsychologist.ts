// types/psychologist.dto.ts
export type CreateUserDTO = {
  email: string;
  password: string;
};

export type CreatePsychologistDTO = {
  name: string;
  crp: string;
  birthDate: string; // ISO date format
  activitiesStartDate: string; // ISO date format
  userId: number;
};

export type PsychologistResponse = {
  id: number;
  name: string;
  crp: string;
  birthDate: string;
  activitiesStartDate: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
};

export type UserResponse = {
  id: number;
  email: string;
  type: string;
  createdAt: string;
  updatedAt: string;
};

export type ApiError = {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
};
