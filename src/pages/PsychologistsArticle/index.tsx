// src/pages/PsychologistsArticle/index.tsx
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticleById } from "./../../services/getArticleById";
import { ArticleResponse } from "../../dtos/getArticlesByPsychologist";
import { BaseLayout } from "../../components/BaseLayout";
import {
  Container,
  Content,
  ContentTitle,
  CreatedAt,
  Header,
  Image,
  Subtitle,
  Title,
  Divider,
  ContainerContent,
  ContentWrapper,
  ButtonBack,
} from "./styles";
import back from "./../../assets/png/green-back.png";

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
      <Container>
        <ButtonBack>
          <Link
            to={
              article && (article as ArticleResponse).psychologistId
                ? `/psychologist-profile/${
                    (article as ArticleResponse).psychologistId
                  }`
                : "/"
            }
          >
            <img src={back} alt="back" width={"30px"} />
          </Link>
        </ButtonBack>
        <Header>
          <ContentTitle>
            <Title>{article.title}</Title>
            <Subtitle>{article.subtitle}</Subtitle>
            <CreatedAt>
              Criado em: {new Date(article.createdAt).toLocaleDateString()}
            </CreatedAt>
          </ContentTitle>

          {article.image && <Image src={article.image} alt={article.title} />}
        </Header>
        <Divider />
        <ContainerContent>
          <ContentWrapper>
            <Content>{article.content}</Content>
          </ContentWrapper>
        </ContainerContent>
      </Container>
    </BaseLayout>
  );
}
