import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Container } from "./styles";
import { LoginForm } from "../../components/Forms/LoginForm";

export default function Login() {
  const navigate = useNavigate();

  return (
    <Container>
      <LoginForm />
      <Button
        borderRadius="10px"
        width="200px"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          navigate("/choose-login");
        }}
      >
        Voltar
      </Button>
    </Container>
  );
}
