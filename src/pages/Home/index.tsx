import { Banner } from "../../components/Banner";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { UserForm } from "../../components/UserForm";
import { cards } from "../../consts/cards";
import { TitleForm, TextForm, TitleBanner6, TextBanner6, ChatAlert, TextChat, TitleChat} from "./styles";
import { ToolTip } from "../../components/ToolTip";

import banner1 from "./../../assets/png/banner1.jpg";
import banner2 from "./../../assets/png/banner2.png";
import banner3 from "./../../assets/png/banner3.png";
import banner4 from "./../../assets/png/banner4.png";
import banner5 from "./../../assets/png/banner5.png";
import banner6 from "./../../assets/png/banner6.png";

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
          <h1>Home</h1>
          <Button variant="primary" width="500px">
            Primary
          </Button>
          <Button variant="secondary">Secondary</Button>
        </Banner>
        <Banner image={banner2} height="600px">
          <h1>Home</h1>
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
        </Banner>
        <Banner image={banner3} height="634px">
          <h1>Home</h1>
          {cards.map((card, index) =>
            card.haveImage === true ? (
              <Card
                key={index}
                title={card.title}
                description={card.description}
                haveImage={card.haveImage}
              />
            ) : null
          )}
        </Banner>
        <Banner image={banner4} height="711px">
          <h1>Home</h1>
        </Banner>
        <Banner image={banner5} height="641px">
          <h1>Home</h1>
        </Banner>
        <ChatAlert>
          <TitleChat>Precisa conversar</TitleChat>
          <TextChat>
            Nosso chat de acolhimento com voluntários está disponível para ouvir
            você. Não guarde suas emoções para si. Fale com a gente agora mesmo!
          </TextChat>
          <Button width="300px" variant="primary">Fale conosco</Button>
        </ChatAlert>
        <ToolTip />
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
      <div></div>
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
