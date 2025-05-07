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
import back from "./../../assets/png/back-button.png";

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
          <img src={back} alt="back" width={"30px"} />
        </Link>
      </ContentButton>
    </Container>
  );
}
