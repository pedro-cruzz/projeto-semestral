import {
  FooterContainer,
  FooterContent,
  Address,
  Contact,
  Copy,
  SocialMedia,
  Privacity,
  RightSide,
  LeftSide,
} from "./styles";

export function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <LeftSide>
          <Address>
            <h2>Endereço</h2>
            <p>Rua das Acácias, 123 – Bairro Jardim das Pedras</p>
            <p>Itajubá – MG, CEP 37500-000</p>
          </Address>
          <Contact>
            <h2>contato</h2>
            <p>Telefone: +55(35) 99876-2345</p>
            <p>Email: mentesaudavel014@gmail.com</p>
          </Contact>
        </LeftSide>
        <RightSide>
          <SocialMedia>
            <h2>Nos acompanhe pelas redes</h2>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "1rem",
                color: "${({ color }) => color || theme.colors.DARK_GREEN};",
              }}
            >
              <img
                src="src\assets\png\facebook_footer.png"
                alt="logo instagram"
                width="20px"
              />
              <img
                src="src\assets\png\linkedin_footer.png"
                alt="logo linkedin"
                width="20px"
              />
            </div>
          </SocialMedia>
          <Privacity>
            <p style={{ fontSize: "20px" }}>
              políticas e termos de privacidade
            </p>
          </Privacity>
        </RightSide>
        </FooterContent>
        <Copy>&copy; 2025 Mente Saudável. Todos os direitos reservados.</Copy>
      
    </FooterContainer>
  );
}
