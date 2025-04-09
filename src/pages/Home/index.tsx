import { Banner } from "../../components/Banner";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { UserForm } from "../../components/UserForm";
import { cards } from "../../consts/cards";
import {
  Cards,
  TextBanner6,
  TextForm,
  TitleBanner6,
  TitleForm,
  TitleChat,
  TextChat,
  ChatAlert,
  TitleBanner1,
  TextBanner1,
  ContainerBanner1,
  Separator,

} from "./styles";
import { ToolTip } from "../../components/ToolTip";

import banner1 from "./../../assets/png/banner1.jpg";
import banner2 from "./../../assets/png/banner2.png";
import banner3 from "./../../assets/png/banner3.png";
import banner4 from "./../../assets/png/banner4.png";
import banner5 from "./../../assets/png/banner5.png";
import banner6 from "./../../assets/png/banner6.png";
import logo from "./../../assets/png/logo.png";

export function Home() {
  const handleUserSubmit = (data: {
    name: string;
    phone: string;
    email: string;
  }) => {
    console.log("Usuário cadastrado:", data);
    alert(`Usuário ${data.name} cadastrado com sucesso!`);
  };

  return (
    <>
      <div>
        <Banner image={banner1} height="792px">
          <ContainerBanner1>
            <img src={logo} alt="Logo" width="200px" height="auto" />
            <TitleBanner1>Cuidando da sua mente</TitleBanner1>
            <TextBanner1>Apoio, informação e acolhimento para
            sua saúde mental</TextBanner1>
            <Button $variant="primary" width="300px">
              Fale conosco
            </Button>
          </ContainerBanner1>
        </Banner>
        <Banner image={banner2} height="600px">
          <h1>Home</h1>
          <Cards>
            {cards.map((card, index) =>
              card.haveImage === false ? (
                <Card
                  key={index}
                  title={card.title}
                  description={card.description}
                  haveImage={card.haveImage}
                  icon={card.icon}
                />
              ) : null
            )}
          </Cards>
        </Banner>
        <Banner image={banner3} height="634px">
          <h1>Home</h1>
          <Cards>
            {cards.map((card, index) =>
              card.haveImage === true ? (
                <Card
                  key={index}
                  title={card.title}
                  description={card.description}
                  haveImage={card.haveImage}
                  image={card.image}
                />
              ) : null
            )}
          </Cards>
        </Banner>
        <Banner image={banner4} height="711px">
          <h1>Home</h1>
        </Banner>
        <Banner image={banner5} height="641px">
          <h1>Home</h1>
        </Banner>
        <Separator></Separator>
        <ChatAlert>
          <TitleChat>Precisa conversar</TitleChat>
          <TextChat>
            Nosso chat de acolhimento com voluntários está disponível para ouvir
            você. Não guarde suas emoções para si. Fale com a gente agora mesmo!
          </TextChat>
          <a href="https://wa.me/5535998603656" target="_blank">
            <Button width="300px" $variant="primary">
              Fale conosco
            </Button>
            
          </a>
        </ChatAlert>
        <Separator></Separator>
        <ToolTip />
        <Separator></Separator>
        <Banner image={banner6} height="641px">
          <div>
            <TitleBanner6>Junte-se à Mente Saudável!</TitleBanner6>
            <TextBanner6>
              <p>
                Na Mente Saudável, todos têm um papel importante na construção
                de uma comunidade mais acolhedora e consciente sobre a saúde
                mental. Se você é um profissional de saúde mental, junte-se a
                nós oferecendo seus serviços voluntários e fazendo a diferença
                na vida de muitas pessoas.
              </p>
              <p>
                Se você busca apoio ou deseja aprender mais sobre autocuidado e
                bem-estar emocional, explore nossos conteúdos e encontre o
                suporte necessário..
              </p>
            </TextBanner6>
          </div>
        </Banner>
      </div>
      <div id="#form">
        <TitleForm>Psicólogos, juntem-se a Mente Saudável</TitleForm>
        <TextForm>
          Ofereça seu apoio voluntário, faça a diferença na conunidade e ajude a
          promover a saúde mental para todos.
        </TextForm>

        <UserForm onSubmit={handleUserSubmit} />
      </div>
    </>
  );
}
