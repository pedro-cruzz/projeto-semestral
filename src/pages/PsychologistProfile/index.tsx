import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
  ButtonBack,
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
import { EditProfileModal } from "./components/ModalEdit";
import { ConfirmDeleteModal } from "./components/ModalDelete";
import { deletePsychologist } from "../../services/deletePsychologist";
import { countFavoritesByPsychologist } from "../../services/favoriteApi";
import PatientsFavoritedModal from "./components/PatientsFavoritedModal";
import { ContactResponse } from "../../dtos/contact";
import { getContactByPsychologist } from "../../services/contactApi";
import { AddressResponse } from "../../dtos/adresss";
import { getAddressByPsychologist } from "../../services/adress";
import { chunkArray } from "../../utils/chuncks";
import {
  Loading,
  PageButton,
  PaginationWrapper,
} from "../PatientProfile/styles";

export function PsychologistProfile() {
  const { userId, signOut } = useContext(AuthContext);
  const { psychologistId } = useParams<{ psychologistId: string }>();
  const [psychologist, setPsychologist] = useState<PsychologistResponse | null>(
    null
  );
  const [articles, setArticles] = useState<ArticleResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentPsychologist, setCurrentPsychologist] =
    useState<PsychologistResponse | null>(null);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [contact, setContact] = useState<ContactResponse | null>(null);
  const [address, setAddress] = useState<AddressResponse | null>(null);

  const navigate = useNavigate();
  const handleUpdateProfile = (
    updatedData: PsychologistResponse | ContactResponse | AddressResponse
  ) => {
    if ("userId" in updatedData) {
      setCurrentPsychologist(updatedData);
      setPsychologist(updatedData);
    } else if (
      "gmail" in updatedData ||
      "linkedin" in updatedData ||
      "whatsapp" in updatedData
    ) {
      setContact(updatedData as ContactResponse);
    } else if (
      "country" in updatedData ||
      "uf" in updatedData ||
      "cep" in updatedData
    ) {
      setAddress(updatedData as AddressResponse);
    }
  };

  const isOwnProfile = psychologist?.userId === userId;

  useEffect(() => {
    if (psychologist) {
      setCurrentPsychologist(psychologist);
    }
  }, [psychologist]);

  useEffect(() => {
    if (psychologistId) {
      countFavoritesByPsychologist(psychologistId)
        .then(setFavoriteCount)
        .catch((error) => console.error("Erro ao buscar favoritos:", error));
    }
  }, [psychologistId]);

  useEffect(() => {
    if (psychologistId) {
      // Executa ambas as requisições em paralelo
      Promise.all([
        getPsychologistById(psychologistId),
        getArticlesByPsychologistId(psychologistId),
        getContactByPsychologist(psychologistId),
        getAddressByPsychologist(psychologistId),
      ])
        .then(([psychData, articlesData, contactData, addressData]) => {
          setPsychologist(psychData);
          setArticles(articlesData);
          setContact(contactData);
          setAddress(addressData);
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

  useEffect(() => {
    if (!psychologist) return;
    getContactByPsychologist(psychologist.id).then(setContact);
    getAddressByPsychologist(psychologist.id).then(setAddress);
  }, [psychologist]);

  const [currentPage, setCurrentPage] = useState(0);

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

  const handleDelete = async () => {
    if (!psychologist) return;
    try {
      await deletePsychologist(psychologist.id);
      signOut();
      navigate("/"); // redireciona para home
    } catch (error) {
      console.error("Erro ao deletar:", error);
      // opcional: exibir snackbar de erro
    }
  };

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

  const itemsPerCarousel = 15;
  const carouselsPerPage = 4;
  const articleChunks = chunkArray(articles, itemsPerCarousel);

  const totalPages = Math.ceil(articleChunks.length / carouselsPerPage);

  const pageChunks = articleChunks.slice(
    currentPage * carouselsPerPage,
    currentPage * carouselsPerPage + carouselsPerPage
  );

  const handlePrevPage = () => {
    setCurrentPage((p) => Math.max(0, p - 1));
  };
  const handleNextPage = () => {
    setCurrentPage((p) => Math.min(totalPages - 1, p + 1));
  };

  return (
    <BaseLayout $variant="secondary">
      <Container key={profileProps.psychologistId}>
        <ContainerCardProfile>
          <Image src={profileProps.image} alt="Imagem de perfil de psicólogo" />
          <CardProfile
            psychologistId={profileProps.psychologistId}
            about={profileProps.about}
            crp={profileProps.crp}
            name={profileProps.name}
            specialization={profileProps.specialization}
            showActionButtons={isOwnProfile}
            onEditClick={() => setEditModalOpen(true)}
            onDeleteClick={() => setDeleteModalOpen(true)}
            favoriteCount={favoriteCount}
            setModalOpen={setModalOpen}
            isOwnProfile={isOwnProfile}
            email={contact?.gmail || ""}
            linkedin={contact?.linkedin || ""}
            whatsapp={contact?.whatsapp || ""}
            country={address?.country}
            uf={address?.uf}
            cep={address?.cep}
            city={address?.city}
            district={address?.district}
            street={address?.street}
            number={address?.number}
          />
        </ContainerCardProfile>
        {currentPsychologist && (
          <EditProfileModal
            psychologist={currentPsychologist}
            open={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            onUpdate={handleUpdateProfile}
          />
        )}
        {currentPsychologist && (
          <ConfirmDeleteModal
            open={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onConfirm={handleDelete}
          />
        )}
        {currentPsychologist && (
          <PatientsFavoritedModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            psychologistId={profileProps.psychologistId}
          />
        )}

        <Separator />
        <ArticlesContainer>
          <div style={{ alignSelf: "flex-end", marginRight: "8rem" }}>
            {isOwnProfile && (
              <Button
                $variant="secondary"
                width="200px"
                onClick={() => navigate("/psychologist-article/create")}
              >
                + Criar Artigo
              </Button>
            )}
          </div>
          <Title>Artigos Recentes</Title>
          <ContainerCardArticles>
            {loading ? (
              <Loading>Carregando psicólogos...</Loading>
            ) : articleChunks.length > 0 ? (
              <>
                {pageChunks.map((chunk, idx) => (
                  <Carousel
                    key={idx}
                    items={chunk}
                    itemsPerPage={3}
                    renderItem={(article) => (
                      <CardArticle
                        key={article.id}
                        id={article.id}
                        idPsychologist={profileProps.psychologistId}
                        image={article.image || profileProps.imageArticle}
                        title={article.title || profileProps.title}
                        subtitle={article.subtitle || profileProps.subtitle}
                      />
                    )}
                  />
                ))}
                {/* Controles de paginação dos Carousels */}
                <PaginationWrapper>
                  <PageButton
                    onClick={handlePrevPage}
                    disabled={currentPage === 0}
                  >
                    ← Página anterior
                  </PageButton>
                  <span>
                    Página {currentPage + 1} de {totalPages}
                  </span>
                  <PageButton
                    onClick={handleNextPage}
                    disabled={currentPage >= totalPages - 1}
                  >
                    Próxima página →
                  </PageButton>
                </PaginationWrapper>
              </>
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
