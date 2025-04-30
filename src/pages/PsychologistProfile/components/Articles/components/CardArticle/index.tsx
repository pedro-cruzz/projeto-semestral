import { Button } from "../../../../../../components/Button";
import {
  Container,
  Image,
  Description,
  Title,
  Content,
  ContentText,
} from "./styles";

import imagem from "./../../../../../../assets/png/pacientes.jpg";

export function CardArticle() {
  return (
    <Container>
      <Content>
        <Image src={imagem} />
        <ContentText>
          <Title>Por que estamos sempre cansados?</Title>
          <Description>
            Entenda os verdadeiros motivos por trás do cansaço constante e
            descubra estratégias eficazes para recuperar sua energia física,
            mental e emocional.
          </Description>
        </ContentText>

        <Button width="196px" $variant="secondary">
          Leia mais
        </Button>
      </Content>
    </Container>
  );
}
