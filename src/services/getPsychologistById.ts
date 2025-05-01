// services/getPsychologistById.ts
import { PsychologistResponse, ApiError } from "../dtos/getPsychologistById";

/**
 * Busca um psicólogo pelo ID.
 * @param psychologistId O ID do psicólogo a ser buscado.
 * @returns Um objeto contendo os dados do psicólogo, ou lança um erro em caso de falha.
 */
export async function getPsychologistById(
  psychologistId: string
): Promise<PsychologistResponse> {
  try {
    const response = await fetch(
      `http://localhost:3001/psychologists/${psychologistId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.message || "Erro ao buscar psicólogo");
    }

    const psychologist: PsychologistResponse = await response.json();
    return psychologist;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Erro ao buscar psicólogo:", err.message);
    throw new Error(err.message || "Erro ao buscar psicólogo");
  }
}
