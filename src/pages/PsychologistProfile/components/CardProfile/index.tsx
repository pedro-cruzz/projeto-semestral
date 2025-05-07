import Dropdown from "../DropDown";
import {
  Container,
  Content,
  EditImage,
  About,
  CRP,
  Divider,
  ImageMedia,
  Label,
  Name,
  SocialMedia,
  Text,
  TextAbout,
  TitleAbout,
  TextMedia,
} from "./styles";
import { ICardProfileProps } from "./types";

import greenEdit from "./../../../../assets/png/green-edit.png";
import greenLinkedin from "./../../../../assets/png/green-linkedin.png";
import greenWhatsapp from "./../../../../assets/png/green-whatsapp.png";
import greenEmail from "./../../../../assets/png/green-email.png";

export function CardProfile({
  about,
  crp,
  name,
  specialization,
  showEditButton = false,
}: ICardProfileProps) {
  return (
    <Container>
      <Content>
        {showEditButton && (
          <EditImage src={greenEdit} alt="Editar perfil de psicólogo" />
        )}
        <Text>
          <Name>{name}</Name>
          <Dropdown items={specialization} label="Especialização" />
          <CRP>N° de registro: CRP {crp}</CRP>
        </Text>
        <TextMedia>
          <Label>Entre em contato:</Label>
          <SocialMedia>
            <ImageMedia src={greenLinkedin} alt="Linkedin" />
            <ImageMedia src={greenEmail} alt="Email" />
            <ImageMedia src={greenWhatsapp} alt="Whatsapp" />
          </SocialMedia>
        </TextMedia>
        <Divider />
        <About>
          <TitleAbout>Sobre o profissional:</TitleAbout>
          <TextAbout>{about}</TextAbout>
        </About>
      </Content>
    </Container>
  );
}
