// src/dtos/article.ts
export interface ArticleResponse {
  id: string;
  psychologistId: string;
  title: string;
  subtitle: string;
  image: string;
  content: string;
  createdAt: string;
}

export interface CreateArticleDTO {
  psychologistId: string;
  title: string;
  subtitle: string;
  image?: string;
  content: string;
}

export interface UpdateArticleDTO {
  title?: string;
  subtitle?: string;
  image?: string;
  content?: string;
}
