import {
  Container,
  Content,
  Icons,
  Name,
  Divider,
  Label,
  Text,
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
  showActionButtons = false,
  onEditClick,
  onDeleteClick,
}: ICardProfilePatientProps) {
  return (
    <Container>
      <Content>
        {showActionButtons && (
          <Icons>
            <img
              src={greenEdit}
              alt="Editar perfil de paciente"
              onClick={onEditClick}
            />
            <img src={trash} alt="Deletar paciente" onClick={onDeleteClick} />
          </Icons>
        )}
        <Text>
          <Name>{name}</Name>
          <Label>Nascido em: {new Date(birthDate).toLocaleDateString()}</Label>
        </Text>
        <Divider />
        <Label>Informações do paciente</Label>
      </Content>
    </Container>
  );
}

export default CardProfilePatient;
