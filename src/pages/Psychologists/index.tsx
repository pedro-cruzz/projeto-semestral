// pages/Psicologos/index.tsx
import { useEffect, useState } from "react";
import { BaseLayout } from "../../components/BaseLayout";
import { Carousel } from "../../components/Carousel";
import { getAllPsychologists } from "../../services/getAllPsychologists";
import { PsychologistResponse } from "../../dtos/getPsychologistById";
import { CardPsychologist } from "./components/CardPsychologist";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { chunkArray } from "../../utils/chuncks";
import { PageButton, PaginationWrapper } from "../PatientProfile/styles";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  padding-block: 2rem;
`;

const Title = styled.h1`
  font-family: ${theme.fonts.playfair};
  font-size: 30px;
  font-weight: 700;
  color: ${theme.colors.DARK_GREEN};
`;

const Loading = styled.div`
  padding: 4rem;
  text-align: center;
`;

export default function Psicologos() {
  const [psychologists, setPsychologists] = useState<PsychologistResponse[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllPsychologists()
      .then(setPsychologists)
      .catch((err) => console.error("Erro ao carregar psicólogos:", err))
      .finally(() => setLoading(false));
  }, []);

  const itemsPerCarousel = 15;
  const carouselsPerPage = 4;
  const psychologistsChunks = chunkArray(psychologists, itemsPerCarousel);

  const totalPages = Math.ceil(psychologistsChunks.length / carouselsPerPage);
  const [currentPage, setCurrentPage] = useState(0);

  const pageChunks = psychologistsChunks.slice(
    currentPage * carouselsPerPage,
    currentPage * carouselsPerPage + carouselsPerPage
  );

  if (loading) {
    return (
      <BaseLayout $variant="secondary">
        <div>Carregando...</div>
      </BaseLayout>
    );
  }

  const handlePrevPage = () => {
    setCurrentPage((p) => Math.max(0, p - 1));
  };
  const handleNextPage = () => {
    setCurrentPage((p) => Math.min(totalPages - 1, p + 1));
  };

  return (
    <BaseLayout $variant="secondary">
      <Container>
        <Title>Psicólogos</Title>

        {loading ? (
          <Loading>Carregando psicólogos...</Loading>
        ) : psychologistsChunks.length > 0 ? (
          <>
            {pageChunks.map((psychologists, index) => (
              <Carousel
                key={index}
                items={psychologists}
                itemsPerPage={3}
                renderItem={(psych) => (
                  <CardPsychologist
                    key={psych.id}
                    idPsychologist={psych.id}
                    name={psych.name}
                    about={psych.about ?? ""}
                    image={psych.image}
                  />
                )}
              />
            ))}
            <PaginationWrapper>
              <PageButton onClick={handlePrevPage} disabled={currentPage === 0}>
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
          <div>Nenhum psicólogo encontrado.</div>
        )}
      </Container>
    </BaseLayout>
  );
}
