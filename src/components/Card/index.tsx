import { CardContainer, CardDescription, CardTitle, Container } from "./styles";
import { ICardProps } from "./types";

export function Card({
  title,
  description,
  haveImage,
  icon,
  image,
}: ICardProps) {
  return (
    <Container>
      <CardContainer>
        {haveImage === false ? (
          <img src={icon} alt={title} />
        ) : (
          <img src={image} alt={title} />
        )}
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardContainer>
    </Container>
  );
}
