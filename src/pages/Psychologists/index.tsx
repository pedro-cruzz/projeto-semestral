// pages/Psicologos/index.tsx
import { useEffect, useState } from "react";
import { BaseLayout } from "../../components/BaseLayout";
import { Carousel } from "../../components/Carousel";
import { getAllPsychologists } from "../../services/getAllPsychologists";
import { PsychologistResponse } from "../../dtos/getPsychologistById";
import { CardPsychologist } from "./components/CardPsychologist";
import styled from "styled-components";
import { theme } from "../../styles/theme";

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

  return (
    <BaseLayout $variant="secondary">
      <Container>
        <Title>Psicólogos</Title>

        {loading ? (
          <Loading>Carregando psicólogos...</Loading>
        ) : psychologists.length > 0 ? (
          <Carousel
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
        ) : (
          <div>Nenhum psicólogo encontrado.</div>
        )}
      </Container>
    </BaseLayout>
  );
}
