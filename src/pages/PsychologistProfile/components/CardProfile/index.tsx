import { Container } from "./styles";
import { ICardProfileProps } from "./types";

export function CardProfile({ about, crp, name }: ICardProfileProps) {
  return (
    <Container>
      <p>Card de Pefil de Psicologo, esperar alterações UX</p>
      {name}
      {crp}
      {about}
    </Container>
  );
}
