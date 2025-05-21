// src/services/articleApi.ts
import api from "./api";
import {
  ArticleResponse,
  CreateArticleDTO,
  UpdateArticleDTO,
} from "../dtos/article";

/** Cria um novo artigo */
export async function createArticle(
  data: CreateArticleDTO
): Promise<ArticleResponse> {
  const res = await api.post<ArticleResponse>("/articles", {
    ...data,
    createdAt: new Date().toISOString(),
  });
  return res.data;
}

/** Busca um artigo pelo seu ID */
export async function getArticleById(
  articleId: string
): Promise<ArticleResponse> {
  const res = await api.get<ArticleResponse>(`/articles/${articleId}`);
  return res.data;
}

/** Atualiza um artigo existente */
export async function updateArticle(
  articleId: string,
  data: UpdateArticleDTO
): Promise<ArticleResponse> {
  const res = await api.patch<ArticleResponse>(`/articles/${articleId}`, data);
  return res.data;
}

/** Remove um artigo pelo seu ID */
export async function deleteArticle(articleId: string): Promise<void> {
  await api.delete(`/articles/${articleId}`);
}
