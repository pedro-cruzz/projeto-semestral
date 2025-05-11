// services/getAllPsychologists.ts
import { PsychologistResponse, ApiError } from "../dtos/getPsychologistById";

/**
 * Busca todos os psicólogos cadastrados.
 * @returns Um array contendo os dados de todos os psicólogos, ou lança um erro em caso de falha.
 */
export async function getAllPsychologists(): Promise<PsychologistResponse[]> {
  try {
    const response = await fetch(`http://localhost:3001/psychologists`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.message || "Erro ao buscar psicólogos");
    }

    const psychologists: PsychologistResponse[] = await response.json();
    return psychologists;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Erro ao buscar psicólogos:", err.message);
    throw new Error(err.message || "Erro ao buscar psicólogos");
  }
}
