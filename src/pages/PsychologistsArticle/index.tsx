// src/pages/PsychologistsArticle/index.tsx
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticleById } from "./../../services/getArticleById";
import { ArticleResponse } from "../../dtos/getArticlesByPsychologist";
import { BaseLayout } from "../../components/BaseLayout";

export function PsychologistsArticle() {
  const { articleId } = useParams<{ articleId: string }>();
  const [article, setArticle] = useState<ArticleResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (articleId) {
      getArticleById(articleId)
        .then((data) => setArticle(data))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [articleId]);

  if (loading)
    return (
      <BaseLayout $variant="secondary">
        <div>Carregando artigo…</div>
      </BaseLayout>
    );

  if (!article)
    return (
      <BaseLayout $variant="secondary">
        <h1>Artigo não encontrado!</h1>
        <Link to="/">Voltar</Link>
      </BaseLayout>
    );

  return (
    <BaseLayout $variant="secondary">
      <h1>{article.title}</h1>
      <h4>{article.subtitle}</h4>
      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          style={{ maxWidth: "100%" }}
        />
      )}
      <p>{article.content}</p>
      <small>
        Criado em: {new Date(article.createdAt).toLocaleDateString()}
      </small>
    </BaseLayout>
  );
}
