import styled from "styled-components";
import consulta from "./../../assets/png/consulta.jpg";
import { theme } from "../../styles/theme";

export const Container = styled.main`
  position: relative;
  background-image: url(${consulta});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  flex-direction: column;

  justify-content: space-around;
  /* height: 100vh; */
  z-index: 0;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-color: ${theme.colors.DARK_GREEN};
    opacity: 0.9;
    z-index: 1;
  }

  > * {
    position: relative;
    z-index: 2;
  }
`;

export const ContentText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 400px;
  gap: 20px;
`;

export const Title = styled.h1`
  font-size: 30px;
  color: ${theme.colors.WHITE};
  font-family: ${theme.fonts.playfair};
`;

export const Text = styled.p`
  font-size: 16px;
  color: ${theme.colors.WHITE};
  font-family: ${theme.fonts.mulish};
`;

export const ContentMain = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const ContentButton = styled.div`
  display: flex;
  justify-content: center;
`;
