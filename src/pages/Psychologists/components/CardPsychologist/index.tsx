import { About, Button, CardContainer, Content, Img, Name } from "./styles";

interface CardProps {
  idPsychologist: string;
  name: string;
  about?: string;
  image?: string;
}

export function CardPsychologist({
  idPsychologist,
  name,
  about,
  image,
}: CardProps) {
  return (
    <CardContainer>
      <Img src={image || "/assets/default-user.png"} alt={name} />
      <Content>
        <Name>{name}</Name>
        <About>{about || "—"}</About>
      </Content>
      <Button to={`/psychologist-profile/${idPsychologist}`}>Ver perfil</Button>
    </CardContainer>
  );
}
