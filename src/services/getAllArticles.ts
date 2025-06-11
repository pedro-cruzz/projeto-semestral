// services/getAllPatients.ts
import { ArticleResponse } from "../dtos/getArticlesByPsychologist";
import api from "./api";

/**
 * Busca todos os pacientes.
 */
export async function getAllArticles(): Promise<ArticleResponse[]> {
  const response = await api.get<ArticleResponse[]>("/articles");
  if (response.status !== 200) {
    throw new Error("Erro ao buscar pacientes");
  }
  return response.data;
}
