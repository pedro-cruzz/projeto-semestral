import { useNavigate } from "react-router-dom";
import { BaseLayout } from "../../components/BaseLayout";
import { Button } from "../../components/Button";
import { Card, Content, Title, User, UserImage, Users } from "./styles";

import psicologos from "./../../assets/png/psicologos.jpg";
import pacientes from "./../../assets/png/pacientes.jpg";
import Tooltip from "@mui/material/Tooltip";

export function ChooseLogin() {
  const navigate = useNavigate();
  return (
    <>
      <BaseLayout>
        <Content>
          <Card>
            <Title>Escolha uma das opções de login abaixo</Title>
            <Users>
              <User>
                <UserImage src={psicologos} alt="Psicólogos" />
                <Button
                  $variant="secondary"
                  fontWeight="normal"
                  borderRadius="10px"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Sou Psicólogo
                </Button>
              </User>
              <Tooltip title="Em breve" arrow placement="top">
                <span>
                  <User className="disabled">
                    <UserImage src={pacientes} alt="Pacientes" />
                    <Button
                      $variant="secondary"
                      fontWeight="normal"
                      borderRadius="10px"
                    >
                      Sou Paciente
                    </Button>
                  </User>
                </span>
              </Tooltip>
            </Users>
          </Card>
          <Button
            borderRadius="10px"
            width="200px"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              navigate("/");
            }}
          >
            Voltar
          </Button>
        </Content>
      </BaseLayout>
    </>
  );
}
