import { Card } from "./types";

import chat from "./../assets/png/chat.png";
import blog from "./../assets/png/blog.png";
import medicos from "./../assets/png/médicos.png";
import jovensAdultos from "./../assets/png/jovens-e-adultos.png";
import familias from "./../assets/png/familias.png";
import profissionais from "./../assets/png/profissionais.png";

export const cards: Card[] = [
  {
    title: "Conteudo Informativo",
    description:
      "Artigos, dicas e orientações práticas para lidar com ansiedade, depressão e outros desafios emocionais.",
    haveImage: false,
    icon: `${blog}`,
  },
  {
    title: "Diretório de Profissionais",
    description:
      "Encontre psicólogos, terapeutas e grupos de apoio prontos para ajudar.",
    haveImage: false,
    icon: `${medicos}`,
  },
  {
    title: "Chat de Acolhimento",
    description:
      "Converse com voluntários capacitados que podem oferecer orientação e escuta ativa.",
    haveImage: false,
    icon: `${chat}`,
  },
  {
    title: "Jovens e adultos",
    description:
      "Que enfrentam ansiedade, depressão ou buscam autoconhecimento.",
    haveImage: true,
    image: `${jovensAdultos}`,
  },
  {
    title: "Famílias",
    description:
      "Que precisam de apoio emocional e orientação para ajudar entes queridos.",
    haveImage: true,
    image: `${familias}`,
  },
  {
    title: "Profissionais de Saúde Mental",
    description:
      "Psicólogos e terapeutas interessados em contribuir para a comunidade.",
    haveImage: true,
    image: `${profissionais}`,
  },
];
