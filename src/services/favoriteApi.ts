import { PatientResponse } from "../dtos/registerPatient";
import api from "./api";
import { getAllPatients } from "./getAllPatients";
import { getAllPsychologists } from "./getAllPsychologists";

export interface FavoriteWithPsychologist {
  id: string;
  patientId: string;
  psychologistId: string;
  psychologist: {
    id: string;
    userId: string;
    name: string;
    crp: string;
    birthDate: string;
    activitiesStartDate: string;
    about?: string;
    specialization?: string[];
    image?: string;
  };
}

export interface FavoriteWithPatient {
  id: string;
  patientId: string;
  psychologistId: string;
  patient: PatientResponse;
}
// Interface opcional
interface FavoritePayload {
  patientId: string;
  psychologistId: string;
}

interface Favorite {
  id: string;
  patientId: string;
  psychologistId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  psychologist?: any; // Será preenchido pelo _expand
}

// Adiciona um favorito (se ainda não existir)
export async function addFavorite(payload: FavoritePayload) {
  const { patientId, psychologistId } = payload;

  // Verifica se já existe
  const { data } = await api.get(
    `/favorites?patientId=${patientId}&psychologistId=${psychologistId}`
  );
  if (data.length > 0) return data[0]; // Já favoritado, não duplica

  const response = await api.post("/favorites", payload);
  return response.data;
}

// Remove um favorito por ID
export async function removeFavorite(favoriteId: string) {
  await api.delete(`/favorites/${favoriteId}`);
}

// 2.2. Listar favoritos de um paciente
export async function getFavoritesByPatient(
  patientId: string
): Promise<FavoriteWithPsychologist[]> {
  // ⇐ Mantenha esta tipagem
  const favoritesResponse = await api.get<Favorite[]>("/favorites", {
    params: { patientId },
  });
  const favorites = favoritesResponse.data;

  const psychologists = await getAllPsychologists();

  // Combine os favoritos com os psicólogos correspondentes
  const favoritesWithPsychologists = favorites
    .map((favorite) => {
      const psychologist = psychologists.find(
        (psy) => psy.id === favorite.psychologistId
      );
      return psychologist
        ? { ...favorite, psychologist } // ⇐ Mantém os dados do favorito + psicólogo
        : null;
    })
    .filter(Boolean) as FavoriteWithPsychologist[];

  return favoritesWithPsychologists;
}
// 2.3. Contar pacientes que favoritaram um psicólogo
export async function countFavoritesByPsychologist(
  psychologistId: string
): Promise<number> {
  const response = await api.get<Favorite[]>(
    `/favorites?psychologistId=${psychologistId}`
  );
  return response.data.length;
}

export async function getFavoritesByPsychologist(
  psychologistId: string
): Promise<FavoriteWithPatient[]> {
  // 1. busca os registros de favorite
  const favRes = await api.get<
    {
      id: string;
      patientId: string;
      psychologistId: string;
    }[]
  >("/favorites", {
    params: { psychologistId },
  });
  const favorites = favRes.data;

  // 2. busca todos os pacientes
  const patients = await getAllPatients();

  // 3. combina favorite com patient
  const result: FavoriteWithPatient[] = favorites
    .map((fav) => {
      const patient = patients.find((p) => p.id === fav.patientId);
      if (!patient) return null;
      return {
        ...fav,
        patient,
      };
    })
    .filter((item): item is FavoriteWithPatient => item != null);

  return result;
}
