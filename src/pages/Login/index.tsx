import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { Container } from "./styles";
import { LoginForm } from "../../components/Forms/LoginForm";

export default function Login() {
  return (
    <Container>
      <LoginForm />
      <Link to={"/"}>
        <Button
          borderRadius="10px"
          width="200px"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          Voltar
        </Button>
      </Link>
    </Container>
  );
}
