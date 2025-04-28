import Tooltip from "@mui/material/Tooltip";
import {
  FooterContainer,
  FooterContent,
  ContentText,
  Copy,
  SocialMedia,
  RightSide,
  LeftSide,
  Title,
  Text,
} from "./styles";
import instagram from "./../../assets/png/instagram.png";
import linkedin from "./../../assets/png/linkedin.png";
import instagramWhite from "./../../assets/png/instagram-white.png";
import linkedinWhite from "./../../assets/png/linkedin-white.png";
import { Link } from "react-router-dom";
import { IFooterProps } from "./types";

export function Footer({ $variant = "primary" }: IFooterProps) {
  return (
    <FooterContainer $variant={$variant}>
      <FooterContent>
        <LeftSide>
          <ContentText $variant={$variant}>
            <Title>Endereço</Title>
            <Text>Rua das Acácias, 123 – Bairro Jardim das Pedras</Text>
            <Text>Itajubá – MG, CEP 37500-000</Text>
          </ContentText>
          <ContentText $variant={$variant}>
            <Title>Contato</Title>
            <Text>Telefone: +55(35) 99876-2345</Text>
            <Text>Email: mentesaudavel014@gmail.com</Text>
          </ContentText>
        </LeftSide>
        <RightSide>
          <SocialMedia $variant={$variant}>
            <Title>Nos acompanhe pelas redes</Title>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "1rem",
                color: "${({ color }) => color || theme.colors.DARK_GREEN};",
              }}
            >
              <Link
                to="https://www.instagram.com/_mentesaudavel_14"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={$variant === "primary" ? instagram : instagramWhite}
                  alt="logo instagram"
                />
              </Link>

              <Tooltip title="Em breve">
                <span style={{ opacity: 0.6 }}>
                  <Link
                    to=""
                    style={{ cursor: "default", pointerEvents: "none" }}
                  >
                    <img
                      src={$variant === "primary" ? linkedin : linkedinWhite}
                      alt="logo linkedin"
                    />
                  </Link>
                </span>
              </Tooltip>
            </div>
          </SocialMedia>
          <ContentText $variant={$variant}>
            <Text style={{ fontSize: "20px" }}>
              Políticas e termos de privacidade
            </Text>
          </ContentText>
        </RightSide>
      </FooterContent>
      <ContentText $variant={$variant}>
        <Copy>&copy; 2025 Mente Saudável. Todos os direitos reservados.</Copy>
      </ContentText>
    </FooterContainer>
  );
}
