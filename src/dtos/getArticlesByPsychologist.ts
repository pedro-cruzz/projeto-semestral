export interface ArticleResponse {
  id: string;
  psychologistId: string;
  title: string;
  subtitle: string;
  image: string;
  content: string;
  createdAt: string;
}

export interface ApiError {
  message: string;
}
