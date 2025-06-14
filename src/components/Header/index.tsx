import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import {
  HeaderContainer,
  Logo,
  Nav,
  NavList,
  NavItemLink,
  IconItem,
  ButtonLink,
} from "./styles";

import greenLogo from "./../../assets/svg/green-logo.svg";
import whiteLogo from "./../../assets/png/logo.png";
import wpp from "./../../assets/svg/wpp.svg";
import wppWhite from "./../../assets/png/whatsapp-white.png";
import login from "./../../assets/svg/login.svg";
import loginWhite from "./../../assets/png/login-white.png";
import logout from "./../../assets/png/logout.png";
import logoutWhite from "./../../assets/png/logout-white.png";
import { IHeaderProps } from "./types";
import { AuthContext } from "../../contexts/AuthContext";
import { ConfirmLogoutModal } from "./components/ConfirmLogoutModal";

export function Header({ $variant = "primary" }: IHeaderProps) {
  const { token, signOut, psychologistId, patientId } = useContext(AuthContext);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const handlePsychologisyProfileClick = () => {
    if (psychologistId) {
      navigate(`/psychologist-profile/${psychologistId}`);
    } else {
      console.error("Nenhum psicólogo vinculado a este usuário");
    }
  };

  const handlePatientProfileClick = () => {
    if (patientId) {
      navigate(`/patient-profile/${patientId}`);
    } else {
      console.error("Nenhum psicólogo vinculado a este usuário");
    }
  };

  const handleLogoutClick = () => {
    setModalOpen(true);
  };

  const handleConfirmLogout = () => {
    setModalOpen(false);
    signOut();
  };

  const handleCancelLogout = () => {
    setModalOpen(false);
  };

  return (
    <>
      <HeaderContainer $variant={$variant}>
        <Link to="/">
          <Logo
            src={$variant === "primary" ? greenLogo : whiteLogo}
            alt="Logo"
          />
        </Link>
        <Nav>
          <NavList>
            <NavItemLink to="/" $variant={$variant}>
              Home
            </NavItemLink>

            {/* Item de Perfil Psicologo - Adicionado antes do Login/Logout */}
            {token && psychologistId && (
              <IconItem>
                <ButtonLink
                  onClick={handlePsychologisyProfileClick}
                  $variant={$variant}
                >
                  Meu perfil
                </ButtonLink>
              </IconItem>
            )}

            {/* Item de Perfil Paciente - Adicionado antes do Login/Logout */}
            {token && patientId && (
              <IconItem>
                <ButtonLink
                  onClick={handlePatientProfileClick}
                  $variant={$variant}
                >
                  Meu perfil
                </ButtonLink>
              </IconItem>
            )}

            <NavItemLink to="/blog" $variant={$variant}>
              Blog
            </NavItemLink>

            <NavItemLink to="/psychologists" $variant={$variant}>
              Psicólogos
            </NavItemLink>

            <IconItem>
              {token ? (
                <button
                  onClick={handleLogoutClick}
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
      <ConfirmLogoutModal
        open={modalOpen}
        onConfirm={handleConfirmLogout}
        onCancel={handleCancelLogout}
      />
    </>
  );
}
