import React, { useState } from "react";
import { Banner } from "../../components/Banner";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { UserForm } from "../../components/UserForm";
import { cards } from "../../consts/cards";
import { ToolTip } from "../../components/ToolTip";
import { theme } from "../../styles/theme";

import banner1 from "./../../assets/png/banner1.jpg";
import banner2 from "./../../assets/png/banner2.png";
import banner3 from "./../../assets/png/banner3.png";
import banner4 from "./../../assets/png/banner4.png";
import banner5 from "./../../assets/png/banner5.png";
import banner6 from "./../../assets/png/banner6.png";
import logo from "./../../assets/png/logo.png";

import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

import {
  Cards,
  ChatAlert,
  TitleChat,
  TextChat,
  TitleForm,
  TextForm,
  ContentContainer,
  TitleBanner,
  TextBanner,
} from "./styles";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

export function Home() {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleUserSubmit = async (data: {
    name: string;
    phone: string;
    email: string;
  }) => {
    console.log("Iniciando cadastro...");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Usuário cadastrado:", data);
    setAlertMessage(`Usuário ${data.name} cadastrado com sucesso!`);
    setAlertOpen(true);
  };

  const handleAlertClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  const scrollToContact = () => {
    const chatSection = document.getElementById("contact");
    if (chatSection) {
      chatSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Header />
      {/* Banner 1 */}
      <Banner image={banner1} height="792px">
        <ContentContainer $align="flex-start" $top="250px" $left="150px">
          <img src={logo} alt="Logo" width="200px" height="auto" />
          <TitleBanner>Cuidando da sua mente</TitleBanner>
          <TextBanner style={{ lineHeight: "25px" }}>
            Apoio, informação e acolhimento para <br />
            sua saúde mental
          </TextBanner>
          <Button $variant="primary" width="300px" onClick={scrollToContact}>
            Fale conosco
          </Button>
        </ContentContainer>
      </Banner>

      {/* Banner 2 */}
      <Banner image={banner2} height="600px">
        <ContentContainer
          $align="flex-start"
          $left="800px"
          $right="100px"
          $top="200px"
        >
          <TitleBanner color={theme.colors.DARK_GREEN}>Quem somos?</TitleBanner>
          <TextBanner color={theme.colors.DARK_GREEN}>
            <p>
              Você não está sozinho! A Mente Saudável é uma rede de apoio
              dedicada a promover a saúde mental e o bem-estar emocional.
              Oferecemos informações, dicas de autocuidado e um diretório
              completo de psicólogos, terapeutas e grupos de apoio na sua
              cidade.
            </p>
          </TextBanner>
        </ContentContainer>
      </Banner>

      {/* Banner 3 - Cards sem imagem */}
      <Banner image={banner3} height="634px">
        <ContentContainer
          $align="center"
          $left="210px"
          style={{ gap: "100px" }}
        >
          <TitleBanner color={theme.colors.DARK_GREEN}>
            Encontre apoio e informação
          </TitleBanner>
          <Cards>
            {cards.map(
              (card, index) =>
                !card.haveImage && (
                  <Card
                    key={index}
                    title={card.title}
                    description={card.description}
                    haveImage={card.haveImage}
                    icon={card.icon}
                  />
                )
            )}
          </Cards>
        </ContentContainer>
      </Banner>

      {/* Banner 4 - Cards com imagem */}
      <Banner image={banner4} height="711px">
        <ContentContainer
          $align="center"
          $left="200px"
          style={{ gap: "100px" }}
        >
          <TitleBanner color={theme.colors.DARK_GREEN}>
            Para quem é?
          </TitleBanner>
          <Cards>
            {cards.map(
              (card, index) =>
                card.haveImage && (
                  <Card
                    key={index}
                    title={card.title}
                    description={card.description}
                    haveImage={card.haveImage}
                    image={card.image}
                  />
                )
            )}
          </Cards>
        </ContentContainer>
      </Banner>

      {/* Banner 5 */}
      <Banner image={banner5} height="641px">
        <ContentContainer
          $align="flex-start"
          $top="130px"
          $left="150px"
          $right="750px"
        >
          <TitleBanner color={theme.colors.WHITE}>
            Nosso impacto na sociedade
          </TitleBanner>
          <TextBanner color={theme.colors.WHITE}>
            <p>
              A Mente Saudável tem como propósito transformar a maneira como a
              saúde mental é percebida e acessada na sociedade. Nosso projeto
              oferece uma plataforma acessível e segura, conectando pessoas que
              precisam de ajuda a recursos valiosos, como psicólogos, terapeutas
              e grupos de apoio.
            </p>
            <p>
              Além disso, trabalhamos ativamente para quebrar o estigma em torno
              dos transtornos psicológicos, promovendo o diálogo aberto e
              criando um espaço de acolhimento e empatia.
            </p>
          </TextBanner>
        </ContentContainer>
      </Banner>

      {/* Chat Alert */}
      <ChatAlert id="contact">
        <TitleChat>Precisa conversar?</TitleChat>
        <TextChat>
          Nosso chat de acolhimento com voluntários está disponível para ouvir
          você. Não guarde suas emoções para si. Fale com a gente agora mesmo!
        </TextChat>
        <a href="https://wa.me/5535998603656" target="_blank" rel="noreferrer">
          <Button width="300px" $variant="primary">
            Fale conosco
          </Button>
        </a>
      </ChatAlert>

      <ToolTip />

      {/* Banner 6 */}
      <Banner image={banner6} height="641px">
        <ContentContainer
          $align="flex-start"
          $top="200px"
          $left="700px"
          $right="80px"
        >
          <TitleBanner>Junte-se à Mente Saudável!</TitleBanner>
          <TextBanner>
            <p>
              Na Mente Saudável, todos têm um papel importante na construção de
              uma comunidade mais acolhedora e consciente sobre a saúde mental.
              Se você é um profissional de saúde mental, junte-se a nós
              oferecendo seus serviços voluntários e fazendo a diferença na vida
              de muitas pessoas.
            </p>
            <p>
              Se você busca apoio ou deseja aprender mais sobre autocuidado e
              bem-estar emocional, explore nossos conteúdos e encontre o suporte
              necessário.
            </p>
          </TextBanner>
        </ContentContainer>
      </Banner>

      {/* Formulário */}
      <div id="form">
        <TitleForm>Psicólogos, juntem-se à Mente Saudável</TitleForm>
        <TextForm>
          Ofereça seu apoio voluntário, faça a diferença na comunidade e ajude a
          promover a saúde mental para todos.
        </TextForm>
        <UserForm onSubmit={handleUserSubmit} />
      </div>

      {/* Snackbar com Alert */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleAlertClose} severity="success">
          {alertMessage}
        </Alert>
      </Snackbar>
      <Footer/>
    </>
  );
}
