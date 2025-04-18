import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Container } from "./styles";

export default function Login() {
  const navigate = useNavigate();

  return (
    <Container>
      <p>login</p>
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
