import React from "react";
import { Button } from "../../../../components/Button";
import {
  Container,
  Image,
  Description,
  Title,
  Content,
  ContentText,
} from "./styles";
import imagemPadrao from "./../../../../assets/png/familias.png";
import { CardArticleProps } from "./types";

export const CardArticle: React.FC<CardArticleProps> = ({
  image = imagemPadrao,
  title = "Por que estamos sempre cansados?",
  subtitle = "Entenda os verdadeiros motivos por trás do cansaço constante e descubra estratégias eficazes para recuperar sua energia física, mental e emocional.",
  idPsychologist,
}) => {
  return (
    <Container key={idPsychologist}>
      <Content>
        <Image src={image} alt="Card Image" />
        <ContentText>
          <Title>{title}</Title>
          <Description>{subtitle}</Description>
        </ContentText>
        <Button width={"196px"} $variant={"secondary"}>
          Leia Mais
        </Button>
      </Content>
    </Container>
  );
};

export default CardArticle;
