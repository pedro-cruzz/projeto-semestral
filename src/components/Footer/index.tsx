import Tooltip from "@mui/material/Tooltip";
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
  Title,
  Text,
} from "./styles";
import instagram from "./../../assets/png/instagram.png"
import linkedin from "./../../assets/png/linkedin.png"

export function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <LeftSide>
          <Address>
            <Title>Endereço</Title>
            <Text>Rua das Acácias, 123 – Bairro Jardim das Pedras</Text>
            <Text>Itajubá – MG, CEP 37500-000</Text>
          </Address>
          <Contact>
            <Title>Contato</Title>
            <Text>Telefone: +55(35) 99876-2345</Text>
            <Text>Email: mentesaudavel014@gmail.com</Text>
          </Contact>
        </LeftSide>
        <RightSide>
          <SocialMedia>
            <Title>Nos acompanhe pelas redes</Title>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "1rem",
                color: "${({ color }) => color || theme.colors.DARK_GREEN};",
              }}
            >
              <a
                href="https://www.instagram.com/_mentesaudavel_14"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={instagram} alt="logo instagram" />
              </a>

              <Tooltip title="Em breve">
                <span style={{ opacity: 0.6 }}>
                  <a
                    href=""
                    style={{ cursor: "default", pointerEvents: "none" }}
                  >
                    <img
                      src="linkedin"
                      alt="logo linkedin"
                    />
                  </a>
                </span>
              </Tooltip>
            </div>
          </SocialMedia>
          <Privacity>
            <Text style={{ fontSize: "20px" }}>
              Políticas e termos de privacidade
            </Text>
          </Privacity>
        </RightSide>
      </FooterContent>
      <Copy>&copy; 2025 Mente Saudável. Todos os direitos reservados.</Copy>
    </FooterContainer>
  );
}
