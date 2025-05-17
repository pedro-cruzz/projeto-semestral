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
  ContentMedia,
} from "./styles";
import { ICardProfileProps } from "./types";

import group from "./../../../../assets/png/group.png";
import greenEdit from "./../../../../assets/png/green-edit.png";
import trash from "./../../../../assets/png/trash-bin.png";
import greenLinkedin from "./../../../../assets/png/green-linkedin.png";
import greenWhatsapp from "./../../../../assets/png/green-whatsapp.png";
import greenEmail from "./../../../../assets/png/green-email.png";
import localization from "./../../../../assets/png/localization.png";

// Import para favoritos
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";
import {
  addFavorite,
  removeFavorite,
  getFavoritesByPatient,
} from "./../../../../services/favoriteApi";
import { Alert, Snackbar } from "@mui/material";

export function CardProfile({
  about,
  crp,
  psychologistId,
  name,
  specialization,
  showActionButtons = false,
  favoriteCount: initialCount = 0,
  isOwnProfile,
  email,
  linkedin,
  whatsapp,
  cep,
  city,
  country,
  district,
  number,
  street,
  uf,
  onEditClick,
  onDeleteClick,
  setModalOpen,
}: ICardProfileProps) {
  const { patientId } = useContext(AuthContext);
  const [count, setCount] = useState<number>(initialCount);
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoriteId, setFavoriteId] = useState<string | null>(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

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

  useEffect(() => {
    setCount(initialCount);
  }, [initialCount]);

  const handleToggleFavorite = async () => {
    if (!patientId) return;
    if (isFavorited && favoriteId) {
      await removeFavorite(favoriteId);
      setIsFavorited(false);
      setFavoriteId(null);
      // não desce de zero
      setCount((prev) => Math.max(prev - 1, 0));
    } else {
      const created = await addFavorite({ patientId, psychologistId });
      setIsFavorited(true);
      setFavoriteId(created.id);
      setCount((prev) => prev + 1);
    }
  };

  const handleCopyAddress = () => {
    const parts = [];
    if (street && number) parts.push(`${street}, ${number}`);
    if (district) parts.push(district);
    if (city && uf) parts.push(`${city} - ${uf}`);
    if (cep) parts.push(`CEP: ${cep}`);
    if (country) parts.push(country);
    const fullAddress = parts.join(" | ");
    navigator.clipboard
      .writeText(fullAddress)
      .then(() => {
        setAlertMessage("Endereço copiado!");
        setAlertOpen(true);
      })
      .catch(() => {
        setAlertMessage("Falha ao copiar");
        setAlertOpen(true);
      });
  };
  const handleAlertClose = () => setAlertOpen(false);

  return (
    <Container>
      <Content>
        <Icons>
          {
            <>
              {count !== undefined && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "1rem",
                    alignItems: "baseline",
                  }}
                >
                  <div
                    style={{
                      color: "#666",
                    }}
                  >
                    Favoritado por {count} pacientes
                  </div>
                  {isOwnProfile && (
                    <EditImage
                      src={group}
                      alt="Número de pacientes que favoritaram"
                      onClick={() => setModalOpen?.(true)}
                    />
                  )}
                </div>
              )}
            </>
          }
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
            <>
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
            </>
          )}
        </Icons>
        <Text>
          <Name>{name}</Name>
          <Dropdown items={specialization} label="Especialização" />
          <CRP>N° de registro: CRP {crp}</CRP>
        </Text>
        <ContentMedia>
          <TextMedia>
            <Label>Entre em contato:</Label>
            <SocialMedia>
              {/* LinkedIn */}
              <button
                onClick={() => window.open(linkedin, "_blank")}
                disabled={!linkedin}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: linkedin ? "pointer" : "auto",
                  opacity: linkedin ? 1 : 0.4,
                }}
              >
                <ImageMedia src={greenLinkedin} alt="LinkedIn" />
              </button>

              {/* Email */}
              <button
                onClick={() =>
                  window.open(
                    `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                      email || ""
                    )}`,
                    "_blank"
                  )
                }
                disabled={!email}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: email ? "pointer" : "auto",
                  opacity: email ? 1 : 0.4,
                }}
              >
                <ImageMedia src={greenEmail} alt="Email" />
              </button>

              {/* WhatsApp */}
              <button
                onClick={() =>
                  window.open(
                    `https://wa.me/${whatsapp?.replace(/\D/g, "")}`,
                    "_blank"
                  )
                }
                disabled={!whatsapp}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: whatsapp ? "pointer" : "auto",
                  opacity: whatsapp ? 1 : 0.4,
                }}
              >
                <ImageMedia src={greenWhatsapp} alt="WhatsApp" />
              </button>
            </SocialMedia>
          </TextMedia>
          {(country || uf || cep || city || district || street || number) && (
            <TextMedia>
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <ImageMedia
                  src={localization}
                  alt="Localização"
                  onClick={handleCopyAddress}
                  style={{ cursor: "pointer" }}
                />
                <div style={{ fontSize: "0.9rem", color: "#444" }}>
                  {street && number && `${street}, ${number}`}
                  <br />
                  {district && `${district} - `}
                  {city && uf && `${city} - ${uf}`}
                  <br />
                  {cep && `CEP: ${cep} - `}
                  {country && `${country}`}
                </div>
              </div>
            </TextMedia>
          )}
        </ContentMedia>
        <Divider />
        <About>
          <TitleAbout>Sobre o profissional:</TitleAbout>
          <TextAbout value={about || ""} readOnly />
        </About>
      </Content>
      <Snackbar
        open={alertOpen}
        autoHideDuration={2000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="success" onClose={handleAlertClose}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default CardProfile;
