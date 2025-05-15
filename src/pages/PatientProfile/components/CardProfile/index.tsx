import {
  Container,
  Content,
  Icons,
  Name,
  Divider,
  Label,
  Text,
  About,
  TitleAbout,
  TextAbout,
  EditImage,
} from "./styles";
import { ICardProfilePatientProps } from "./types";

import greenEdit from "../../../../assets/png/green-edit.png";
import trash from "../../../../assets/png/trash-bin.png";

/**
 * Card de perfil para Paciente
 */
export function CardProfilePatient({
  name,
  birthDate,
  about,
  showActionButtons = false,
  onEditClick,
  onDeleteClick,
}: ICardProfilePatientProps) {
  // Cálculo de idade em tempo real
  const calculateAge = (dateString: string): number => {
    const today = new Date();
    const birth = new Date(dateString);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  };

  const age = calculateAge(birthDate);

  return (
    <Container>
      <Content>
        {showActionButtons && (
          <Icons>
            <EditImage
              src={greenEdit}
              alt="Editar perfil de paciente"
              onClick={onEditClick}
              style={{ cursor: "pointer" }}
            />
            <EditImage
              src={trash}
              alt="Deletar paciente"
              onClick={onDeleteClick}
              style={{ cursor: "pointer" }}
            />
          </Icons>
        )}
        <Text>
          <Name>{name}</Name>
          <Label>Idade: {age} anos</Label>
        </Text>
        <Divider />
        <About>
          <TitleAbout>Sobre o paciente:</TitleAbout>
          <TextAbout value={about || ""} readOnly />
        </About>
      </Content>
    </Container>
  );
}

export default CardProfilePatient;
