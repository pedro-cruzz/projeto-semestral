import CardArticle from "./components/CardArticle";
import { CardArticleProps } from "./components/CardArticle/types";
import { Container, Title } from "./styles";

export function Articles({
  idPsychologist,
  image,
  subtitle,
  title,
}: CardArticleProps) {
  return (
    <Container>
      <Title>Artigos recentes</Title>
      <CardArticle
        idPsychologist={idPsychologist}
        image={image}
        subtitle={subtitle}
        title={title}
      />
    </Container>
  );
}
