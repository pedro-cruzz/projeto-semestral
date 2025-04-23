import { Link } from "react-router-dom";
import { BaseLayout } from "../../components/BaseLayout";
import { Button } from "../../components/Button";
import { Card, Content, Title, User, UserImage, Users } from "./styles";

import psicologos from "./../../assets/png/psicologos.jpg";
import pacientes from "./../../assets/png/pacientes.jpg";
import Tooltip from "@mui/material/Tooltip";

export function ChooseRegister() {
  return (
    <BaseLayout>
      <Content>
        <Card>
          <Title>Escolha uma das opções de cadastro abaixo</Title>
          <Users>
            <User>
              <UserImage src={psicologos} alt="Psicólogos" />
              <Link to="/register?type=psicologo">
                <Button
                  $variant="secondary"
                  fontWeight="normal"
                  borderRadius="10px"
                >
                  Sou Psicólogo
                </Button>
              </Link>
            </User>
            <Tooltip title="Em breve" arrow placement="top">
              <span>
                <User className="disabled">
                  <UserImage src={pacientes} alt="Pacientes" />
                  <Link to="/register?type=paciente">
                    <Button
                      $variant="secondary"
                      fontWeight="normal"
                      borderRadius="10px"
                      disabled
                    >
                      Sou Paciente
                    </Button>
                  </Link>
                </User>
              </span>
            </Tooltip>
          </Users>
        </Card>
        <Link to={"/login"}>
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
      </Content>
    </BaseLayout>
  );
}
