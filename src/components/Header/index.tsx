import { Link } from "react-router-dom";
import { useContext } from "react";
import {
  HeaderContainer,
  Logo,
  Nav,
  NavList,
  NavItemLink,
  IconItem,
} from "./styles";

import greenLogo from "./../../assets/svg/green-logo.svg";
import whiteLogo from "./../../assets/png/logo.png";
import wpp from "./../../assets/svg/wpp.svg";
import wppWhite from "./../../assets/png/whatsapp-white.png";
import login from "./../../assets/svg/login.svg";
import loginWhite from "./../../assets/png/login-white.png";
import logout from "./../../assets/png/logout.png";
import logoutWhite from "./../../assets/png/logout-white.png";

import Tooltip from "@mui/material/Tooltip";
import { IHeaderProps } from "./types";
import { AuthContext } from "../../contexts/AuthContext"; // ajuste o caminho conforme sua estrutura

export function Header({ $variant = "primary" }: IHeaderProps) {
  const { token, signOut } = useContext(AuthContext);

  return (
    <HeaderContainer $variant={$variant}>
      <Link to="/">
        <Logo src={$variant === "primary" ? greenLogo : whiteLogo} alt="Logo" />
      </Link>
      <Nav>
        <NavList>
          <NavItemLink to="/" $variant={$variant}>
            Home
          </NavItemLink>
          <Tooltip title="Em breve">
            <span style={{ opacity: 0.6 }}>
              <NavItemLink
                to=""
                $variant={$variant}
                style={{ cursor: "default", pointerEvents: "none" }}
              >
                Blog
              </NavItemLink>
            </span>
          </Tooltip>
          <Tooltip title="Em breve">
            <span style={{ opacity: 0.6 }}>
              <NavItemLink
                to=""
                $variant={$variant}
                style={{ cursor: "default", pointerEvents: "none" }}
              >
                Psicólogos
              </NavItemLink>
            </span>
          </Tooltip>

          <IconItem>
            {token ? (
              // Se o usuário está logado, renderiza um botão de logout.
              <button
                onClick={() => signOut()}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                <img
                  src={$variant === "primary" ? logout : logoutWhite}
                  alt="Logout"
                />
              </button>
            ) : (
              // Se não estiver logado, renderiza o link para a página de login.
              <Link to="/login">
                <img
                  src={$variant === "primary" ? login : loginWhite}
                  alt="Login"
                />
              </Link>
            )}
          </IconItem>

          <IconItem>
            <a
              href="https://wa.me/5535998603656"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={$variant === "primary" ? wpp : wppWhite}
                alt="Contato via WhatsApp"
              />
            </a>
          </IconItem>
        </NavList>
      </Nav>
    </HeaderContainer>
  );
}
