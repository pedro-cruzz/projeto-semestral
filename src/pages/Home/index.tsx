import { Banner } from "../../components/Banner";
import { Button } from "../../components/Button";
import { UserForm } from "../../components/UserForm";

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
        </Banner>
        <Banner image={banner3} height="634px">
          <h1>Home</h1>
        </Banner>
        <Banner image={banner4} height="711px">
          <h1>Home</h1>
        </Banner>
        <Banner image={banner5} height="641px">
          <h1>Home</h1>
        </Banner>
        <Banner image={banner6} height="641px">
          <h1>Home</h1>
        </Banner>
      </div>
      <div>
        <h1>Psicólogos, juntem-se a Mente Saudável</h1>
        <p>
          Ofereça seu apoio voluntário, faça a diferença na conunidade e ajude a
          promover <br></br> a saúde mental para todos.
        </p>

        <UserForm onSubmit={handleUserSubmit} />
      </div>
    </>
  );
}
