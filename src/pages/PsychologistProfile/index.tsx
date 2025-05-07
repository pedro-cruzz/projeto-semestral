import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { BaseLayout } from "../../components/BaseLayout";
import { CardProfile } from "./components/CardProfile";
import { ContainerCardProfile } from "./components/CardProfile/styles";
import {
  Container,
  Separator,
  ArticlesContainer,
  Image,
  Title,
  ContainerCardArticles,
  NotFoundContainer,
  ButtonBack
} from "./styles";
import { getPsychologistById } from "../../services/getPsychologistById";
import { getArticlesByPsychologistId } from "../../services/getArticlesByPsychologist";
import { IPsychologistProfileProps } from "./types";
import { PsychologistResponse } from "../../dtos/getPsychologistById";
import { ArticleResponse } from "../../dtos/getArticlesByPsychologist";
import user from "./../../assets/png/user.png";
import CardArticle from "./components/CardArticle";
import { Carousel } from "../../components/Carousel";
import { AuthContext } from "../../contexts/AuthContext";
import { Button } from "../../components/Button";
import { Link } from "react-router-dom";
import back from "./../../assets/png/back.png";

export function PsychologistProfile() {
  const { userId } = useContext(AuthContext);
  const { psychologistId } = useParams<{ psychologistId: string }>();
  const [psychologist, setPsychologist] = useState<PsychologistResponse | null>(
    null
  );
  const [articles, setArticles] = useState<ArticleResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const isOwnProfile = psychologist?.userId === userId;
  useEffect(() => {
    if (psychologistId) {
      // Executa ambas as requisições em paralelo
      Promise.all([
        getPsychologistById(psychologistId),
        getArticlesByPsychologistId(psychologistId),
      ])
        .then(([psychData, articlesData]) => {
          setPsychologist(psychData);
          setArticles(articlesData);
        })
        .catch((err) => {
          console.error("Erro ao buscar dados do perfil:", err.message);
          setPsychologist(null);
          setArticles([]);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [psychologistId]);

  if (loading) {
    return (
      <BaseLayout $variant="secondary">
        <div>Carregando...</div>
      </BaseLayout>
    );
  }

  if (!psychologist) {
    return (
      <BaseLayout $variant="secondary">
        <NotFoundContainer>
          <ButtonBack>
            <div></div>
            <Link to={"/"}>
            <img src={back} alt="back" width={"30px"} />
            </Link>
          </ButtonBack>
          <h1>Psicólogo não encontrado!</h1>
        </NotFoundContainer>
      </BaseLayout>
    );
  }

  // Mapeia os dados do psicólogo para os atributos definidos na interface
  const profileProps: IPsychologistProfileProps = {
    image: psychologist.image || user, // Valor default para imagem do perfil, caso não haja imagem
    about: psychologist.about || "",
    crp: psychologist.crp,
    name: psychologist.name,
    psychologistId: psychologist.id,
    specialization: psychologist.specialization,
    // Esses valores serão usados apenas como fallback se algum artigo não tiver dados específicos.
    imageArticle: user,
    title: "",
    subtitle: "",
  };

  return (
    <BaseLayout $variant="secondary">
      <Container key={profileProps.psychologistId}>
        <ContainerCardProfile>
          <Image src={profileProps.image} alt="Imagem de perfil de psicólogo" />
          <CardProfile
            about={profileProps.about}
            crp={profileProps.crp}
            name={profileProps.name}
            specialization={profileProps.specialization}
            showEditButton={isOwnProfile}
          />
        </ContainerCardProfile>
        <Separator />
        <ArticlesContainer>
          <div style={{ alignSelf: "flex-end", marginRight: "8rem" }}>
            {isOwnProfile && (
              <Button $variant="secondary" width="200px">
                + Criar Artigo
              </Button>
            )}
          </div>
          <Title>Artigos Recentes</Title>
          <ContainerCardArticles>
            {articles.length > 0 ? (
              <Carousel
                items={articles}
                itemsPerPage={3}
                renderItem={(article) => (
                  <CardArticle
                    key={article.id}
                    idPsychologist={profileProps.psychologistId}
                    image={article.image || profileProps.imageArticle}
                    title={article.title || profileProps.title}
                    subtitle={article.subtitle || profileProps.subtitle}
                  />
                )}
              />
            ) : (
              <div style={{ marginBottom: "4rem" }}>
                Nenhum artigo encontrado.
              </div>
            )}
          </ContainerCardArticles>
        </ArticlesContainer>
      </Container>
    </BaseLayout>
  );
}

export default PsychologistProfile;
