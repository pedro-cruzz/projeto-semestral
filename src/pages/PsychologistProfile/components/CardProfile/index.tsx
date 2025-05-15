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
  Icons,
} from "./styles";
import { ICardProfileProps } from "./types";

import greenEdit from "./../../../../assets/png/green-edit.png";
import trash from "./../../../../assets/png/trash-bin.png";
import greenLinkedin from "./../../../../assets/png/green-linkedin.png";
import greenWhatsapp from "./../../../../assets/png/green-whatsapp.png";
import greenEmail from "./../../../../assets/png/green-email.png";

// Import para favoritos
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";
import {
  addFavorite,
  removeFavorite,
  getFavoritesByPatient,
} from "./../../../../services/favoriteApi";

export function CardProfile({
  about,
  crp,
  psychologistId,
  name,
  specialization,
  showActionButtons = false,
  onEditClick,
  onDeleteClick,
}: ICardProfileProps) {
  const { patientId } = useContext(AuthContext);
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoriteId, setFavoriteId] = useState<string | null>(null);

  // Verifica se já está favoritado
  useEffect(() => {
    if (!patientId) return;
    getFavoritesByPatient(patientId).then((list) => {
      const fav = list.find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (f: any) =>
          f.psychologistId == psychologistId /* assumindo crp único */ ||
          f.psychologist?.id === psychologistId
      );
      if (fav) {
        setIsFavorited(true);
        setFavoriteId(fav.id);
      }
    });
  }, [patientId, psychologistId]);

  const handleToggleFavorite = async () => {
    if (!patientId) return;
    if (isFavorited && favoriteId) {
      await removeFavorite(favoriteId);
      setIsFavorited(false);
      setFavoriteId(null);
    } else {
      const created = await addFavorite({
        patientId,
        psychologistId: /* usar id */ psychologistId,
      });
      setIsFavorited(true);
      setFavoriteId(created.id);
    }
  };

  return (
    <Container>
      <Content>
        <Icons>
          {showActionButtons && (
            <>
              <EditImage
                src={greenEdit}
                alt="Editar perfil de psicólogo"
                onClick={onEditClick}
              />
              <EditImage
                src={trash}
                alt="Deletar psicólogo"
                onClick={onDeleteClick}
              />
            </>
          )}
          {/* Botão de favorito */}
          {patientId && (
            <button
              onClick={handleToggleFavorite}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "1.5rem",
              }}
            >
              {isFavorited ? "💚" : "🤍"}
            </button>
          )}
        </Icons>
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
          <TextAbout value={about || ""} readOnly />
        </About>
      </Content>
    </Container>
  );
}

export default CardProfile;
