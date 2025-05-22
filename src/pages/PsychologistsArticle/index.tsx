// src/pages/PsychologistsArticle/index.tsx
import { useParams, Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { getArticleById } from "../../services/getArticleById";
import { ArticleResponse } from "../../dtos/article";
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
  Icons,
  Icon,
  ContentActions,
} from "./styles";
import back from "./../../assets/png/green-back.png";
import greenEdit from "./../../assets/png/green-edit.png";
import trash from "./../../assets/png/trash-bin.png";
import { AuthContext } from "../../contexts/AuthContext";
import { BaseLayout } from "../../components/BaseLayout";
import { deleteArticle } from "../../services/registerArticle";
import { Box, Modal, Typography, Button as MuiButton } from "@mui/material";

export function PsychologistsArticle() {
  const { articleId } = useParams<{ articleId: string }>();
  const navigate = useNavigate();
  const { psychologistId: ctxId } = useContext(AuthContext);

  const [article, setArticle] = useState<ArticleResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (articleId) {
      getArticleById(articleId)
        .then((data) => setArticle(data))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [articleId]);

  if (loading) {
    return (
      <BaseLayout $variant="secondary">
        <div>Carregando artigo…</div>
      </BaseLayout>
    );
  }

  if (!article) {
    return (
      <BaseLayout $variant="secondary">
        <h1>Artigo não encontrado!</h1>
        <Link to="/">Voltar</Link>
      </BaseLayout>
    );
  }

  const isOwner = article.psychologistId === ctxId;

  const handleDelete = async () => {
    if (!article) return;
    try {
      await deleteArticle(article.id);
      setDeleteModalOpen(false);
      navigate(`/psychologist-profile/${article.psychologistId}`);
    } catch (err) {
      console.error("Erro ao deletar artigo:", err);
    }
  };

  return (
    <BaseLayout $variant="secondary">
      <Container>
        {/* botão voltar */}
        <ButtonBack>
          <Link to={`/psychologist-profile/${article.psychologistId}`}>
            <img src={back} alt="back" width={30} />
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

          <ContentActions>
            {isOwner && (
              <Icons>
                {/* Editar: redireciona com mode=edit&id= */}
                <Icon
                  src={greenEdit}
                  alt="Editar"
                  onClick={() =>
                    navigate(
                      `/psychologist-article/create?mode=edit&id=${article.id}`
                    )
                  }
                />
                {/* Deletar: abre modal */}
                <Icon
                  src={trash}
                  alt="Deletar"
                  onClick={() => setDeleteModalOpen(true)}
                />
              </Icons>
            )}
            {article.image && <Image src={article.image} alt={article.title} />}
          </ContentActions>
        </Header>

        <Divider />

        <ContainerContent>
          <ContentWrapper>
            <Content>{article.content}</Content>
          </ContentWrapper>
        </ContainerContent>
      </Container>

      {/* Modal de confirmação de exclusão */}
      <Modal open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <Box
          sx={{
            position: "absolute" as const,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            p: 3,
            borderRadius: 1,
            minWidth: 300,
          }}
        >
          <Typography variant="h6" mb={2}>
            Tem certeza que deseja excluir este artigo?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <MuiButton
              variant="outlined"
              onClick={() => setDeleteModalOpen(false)}
            >
              Cancelar
            </MuiButton>
            <MuiButton variant="contained" color="error" onClick={handleDelete}>
              Excluir
            </MuiButton>
          </Box>
        </Box>
      </Modal>
    </BaseLayout>
  );
}

export default PsychologistsArticle;
