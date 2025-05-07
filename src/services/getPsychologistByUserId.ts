// services/getPsychologistByUserId.ts

import api from "./api";

interface Psychologist {
  id: string;
  userId: string;
  name: string;
  crp: string;
  birthDate: string;
  activitiesStartDate: string;
  about?: string;
  specialization?: string[];
  image?: string;
  // ... outros campos do psicólogo
}

export const getPsychologistByUserId = async (
  userId: string
): Promise<Psychologist | null> => {
  try {
    const response = await api.get<Psychologist[]>(
      `/psychologists?userId=${userId}`
    );

    // Retorna o primeiro psicólogo encontrado ou null
    return response.data.length > 0 ? response.data[0] : null;
  } catch (error) {
    console.error("Erro ao buscar psicólogo:", error);
    throw new Error("Não foi possível carregar o perfil do psicólogo");
  }
};
