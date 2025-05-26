// pages/Psicologos/index.tsx
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { BaseLayout } from "../../components/BaseLayout";
import { Carousel } from "../../components/Carousel";
import { getAllPsychologists } from "../../services/getAllPsychologists";
import { PsychologistResponse } from "../../dtos/getPsychologistById";
import { CardPsychologist } from "./components/CardPsychologist";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { chunkArray } from "../../utils/chuncks";
import { PageButton, PaginationWrapper } from "../PatientProfile/styles";
import { shuffleArray } from "../../utils/shuffle";
import { CheckboxWithLabel } from "../../components/Forms/fields/CheckBoxField";

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

export const SearchInput = styled.input`
  width: 400px;

  padding: 8px 12px;
  border: 1px solid ${theme.colors.GRAY};
  border-radius: 4px;
  font-size: 16px;
  margin-bottom: 1rem;

  &:focus,
  &:focus-visible {
    outline: none;
    border-color: ${theme.colors.DARK_GREEN};
  }
`;

export const Controls = styled.div`
  display: flex;

  flex-direction: column;

  gap: 6px;
  margin-bottom: 1rem;

  label {
    font-size: 14px;
    color: ${theme.colors.DARK_GREEN};
    input {
      margin-right: 0.25rem;
    }
  }
`;

export default function Psicologos() {
  const [psychologists, setPsychologists] = useState<PsychologistResponse[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [randomize, setRandomize] = useState(false);

  useEffect(() => {
    getAllPsychologists()
      .then(setPsychologists)
      .catch((err) => console.error("Erro ao carregar psicólogos:", err))
      .finally(() => setLoading(false));
  }, []);

  // Combina filtro e aleatorização de forma memoizada
  const processed = useMemo(() => {
    let arr = [...psychologists];

    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      arr = arr.filter((p) => p.name.toLowerCase().includes(term));
    }

    if (randomize) {
      arr = shuffleArray(arr);
    }

    return arr;
  }, [psychologists, searchTerm, randomize]);

  const itemsPerCarousel = 15;
  const carouselsPerPage = 4;

  const psychologistsChunks = chunkArray(processed, itemsPerCarousel);
  const totalPages = Math.ceil(psychologistsChunks.length / carouselsPerPage);
  const [currentPage, setCurrentPage] = useState(0);

  // Reseta para página 0 sempre que o conjunto for recalculado
  useEffect(() => {
    setCurrentPage(0);
  }, [processed]);

  const pageChunks = psychologistsChunks.slice(
    currentPage * carouselsPerPage,
    currentPage * carouselsPerPage + carouselsPerPage
  );

  const handlePrevPage = () => setCurrentPage((p) => Math.max(0, p - 1));
  const handleNextPage = () =>
    setCurrentPage((p) => Math.min(totalPages - 1, p + 1));

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(e.target.value);

  return (
    <BaseLayout $variant="secondary">
      <Container>
        <Title>Psicólogos</Title>

        <Controls>
          <SearchInput
            type="text"
            placeholder="Buscar pelo nome..."
            value={searchTerm}
            onChange={handleSearchChange}
          />

          <CheckboxWithLabel
            label="Ordem aleatória"
            checked={randomize}
            onChange={() => setRandomize((r) => !r)}
          />
        </Controls>

        {loading ? (
          <Loading>Carregando psicólogos...</Loading>
        ) : processed.length > 0 ? (
          <>
            {pageChunks.map((batch, idx) => (
              <Carousel
                key={idx}
                items={batch}
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
