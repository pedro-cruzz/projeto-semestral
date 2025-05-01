// dtos/getPsychologistById.ts
export interface PsychologistResponse {
  id: string;
  userId: string;
  name: string;
  crp: string;
  birthDate: string;
  activitiesStartDate: string;
  about?: string | null;
}

export interface ApiError {
  message: string;
}
