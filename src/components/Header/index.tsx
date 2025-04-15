import { Link } from "react-router-dom";
import {
  HeaderContainer,
  Logo,
  Nav,
  NavList,
  NavItemLink,
  IconItem,
} from "./styles";

export function Header() {
  return (
    <HeaderContainer>
      <Link to="/">
        <Logo src="/logo.svg" alt="Logo" />
      </Link>
      <Nav>
        <NavList>
          <NavItemLink to="/">Home</NavItemLink>
          <NavItemLink to="/blog">Blog</NavItemLink>
          <NavItemLink to="/psychologists">Psicólogos</NavItemLink>
          <IconItem>
            <Link to="/login">
              <img src="/login-icon.svg" alt="Login" />
            </Link>
          </IconItem>
          <IconItem>
            <a
              href="https://wa.me/SEU_NUMERO"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/whatsapp-icon.svg" alt="Contato via WhatsApp" />
            </a>
          </IconItem>
        </NavList>
      </Nav>
    </HeaderContainer>
  );
}
