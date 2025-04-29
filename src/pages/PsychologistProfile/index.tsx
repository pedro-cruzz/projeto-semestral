import { BaseLayout } from "../../components/BaseLayout";
import { CardProfile } from "./components/CardProfile";

import user from "./../../assets/png/user.png";
import { ContainerCardProfile } from "./components/CardProfile/styles";
import { Container, Separator } from "./styles";
import { Articles } from "./components/Articles";

export function PsychologistProfile() {
  return (
    <BaseLayout $variant="secondary">
      <Container>
        <ContainerCardProfile>
          <img src={user} alt="Imagem de perfil de psicólogo" />
          <CardProfile />
        </ContainerCardProfile>
        <Separator />
        <Articles />
      </Container>
    </BaseLayout>
  );
}
