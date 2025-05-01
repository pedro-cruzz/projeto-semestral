// src/pages/PsychologistProfile/index.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { BaseLayout } from "../../components/BaseLayout";
import { CardProfile } from "./components/CardProfile";
import { ContainerCardProfile } from "./components/CardProfile/styles";
import { Container, Separator, ArticlesContainer } from "./styles";
import { Articles } from "./components/Articles";
import { getPsychologistById } from "../../services/getPsychologistById";
import { getArticlesByPsychologistId } from "../../services/getArticlesByPsychologist";
import { IPsychologistProfileProps } from "./types";
import { PsychologistResponse } from "../../dtos/getPsychologistById";
import { ArticleResponse } from "../../dtos/getArticlesByPsychologist";
import user from "./../../assets/png/user.png";

export function PsychologistProfile() {
  const { psychologistId } = useParams<{ psychologistId: string }>();
  const [psychologist, setPsychologist] = useState<PsychologistResponse | null>(
    null
  );
  const [articles, setArticles] = useState<ArticleResponse[]>([]);
  const [loading, setLoading] = useState(true);

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
        <div>Psicólogo não encontrado.</div>
      </BaseLayout>
    );
  }

  // Mapeia os dados do psicólogo para os atributos definidos na interface
  const profileProps: IPsychologistProfileProps = {
    image: user, // Valor default para imagem do perfil, caso não haja imagem
    about: psychologist.about || "",
    crp: psychologist.crp,
    name: psychologist.name,
    psychologistId: psychologist.id,
    // Esses valores serão usados apenas como fallback se algum artigo não tiver dados específicos.
    imageArticle: user,
    title: "",
    subtitle: "",
  };

  return (
    <BaseLayout $variant="secondary">
      <Container key={profileProps.psychologistId}>
        <ContainerCardProfile>
          <img src={profileProps.image} alt="Imagem de perfil de psicólogo" />
          <CardProfile
            about={profileProps.about}
            crp={profileProps.crp}
            name={profileProps.name}
          />
        </ContainerCardProfile>
        <Separator />
        <ArticlesContainer>
          {articles.length > 0 ? (
            articles.map((article) => (
              <Articles
                key={article.id}
                idPsychologist={profileProps.psychologistId}
                image={article.image || profileProps.imageArticle}
                title={article.title || profileProps.title}
                subtitle={article.subtitle || profileProps.subtitle}
              />
            ))
          ) : (
            <div>Nenhum artigo encontrado.</div>
          )}
        </ArticlesContainer>
      </Container>
    </BaseLayout>
  );
}

export default PsychologistProfile;
