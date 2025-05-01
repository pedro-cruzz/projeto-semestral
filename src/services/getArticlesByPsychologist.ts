// services/getArticlesByPsychologist.ts
import { ArticleResponse, ApiError } from "../dtos/getArticlesByPsychologist";

/**
 * Busca os artigos de um psicólogo pelo ID.
 * @param psychologistId O ID do psicólogo cujos artigos serão buscados.
 * @returns Um array de ArticleResponse.
 */
export async function getArticlesByPsychologistId(
  psychologistId: string
): Promise<ArticleResponse[]> {
  try {
    const response = await fetch(
      `http://localhost:3001/articles?psychologistId=${psychologistId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.message || "Erro ao buscar artigos");
    }

    const articles: ArticleResponse[] = await response.json();
    return articles;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Erro ao buscar artigos:", err.message);
    throw new Error(err.message || "Erro ao buscar artigos");
  }
}
