import {
  CardContainer,
  CardDescription,
  CardTitle,
  Container,
  Icon,
  Image,
} from "./styles";
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
      <CardContainer $hasIcon={!!icon}>
        {/* {haveImage === false ? (
          <Icon src={icon} alt={title} />
        ) : (
          <Image src={image} alt={title} />
        )} */}
        {haveImage ? (
          <Image src={image} alt={title} />
        ) : (
          <Icon src={icon} alt={title} />
        )}
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardContainer>
    </Container>
  );
}
