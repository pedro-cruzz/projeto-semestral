// services/getArticleById.ts
import api from "./api";
import { ArticleResponse } from "../dtos/getArticlesByPsychologist";

export async function getArticleById(
  articleId: string
): Promise<ArticleResponse> {
  const res = await api.get<ArticleResponse>(`/articles/${articleId}`);
  return res.data;
}
