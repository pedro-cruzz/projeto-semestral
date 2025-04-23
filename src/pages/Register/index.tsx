import {
  Container,
  ContentText,
  Title,
  Text,
  ContentMain,
  ContentButton,
} from "./styles";
import { RegisterForm } from "../../components/Forms/RegisterForm";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button";

export function Register() {
  return (
    <Container>
      <ContentMain>
        <ContentText>
          <Title>Use seu conhecimento para transformar vidas.</Title>
          <Text>
            Ajude pessoas que precisam de apoio psicológico a encontrarem luz.
          </Text>
        </ContentText>
        <RegisterForm />
      </ContentMain>

      <ContentButton>
        <div></div>
        <Link to={"/choose-register"}>
          <Button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            width="200px"
          >
            Voltar
          </Button>
        </Link>
      </ContentButton>
    </Container>
  );
}
