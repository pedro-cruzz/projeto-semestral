import { Link } from "react-router-dom";
import {
  HeaderContainer,
  Logo,
  Nav,
  NavList,
  NavItemLink,
  IconItem,
} from "./styles";

import logo from "./../../assets/svg/green-logo.svg";
import wpp from "./../../assets/svg/wpp.svg";
import login from "./../../assets/svg/login.svg";

import Tooltip from "@mui/material/Tooltip";

export function Header() {
  return (
    <HeaderContainer>
      <Link to="/">
        <Logo src={logo} alt="Logo" />
      </Link>
      <Nav>
        <NavList>
          <NavItemLink to="/">Home</NavItemLink>
          <Tooltip title="Em breve">
            <span style={{ opacity: 0.6 }}>
              <NavItemLink
                to=""
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
                style={{ cursor: "default", pointerEvents: "none" }}
              >
                Psicólogos
              </NavItemLink>
            </span>
          </Tooltip>

          <IconItem>
            <Link to="/choose-login">
              <img src={login} alt="Login" />
            </Link>
          </IconItem>

          <IconItem>
            <a
              href="https://wa.me/5535998603656"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={wpp} alt="Contato via WhatsApp" />
            </a>
          </IconItem>
        </NavList>
      </Nav>
    </HeaderContainer>
  );
}
