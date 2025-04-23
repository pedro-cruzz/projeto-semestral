import styled from "styled-components";

import clinica from "./../../assets/png/clinica.jpg";
import { theme } from "../../styles/theme";

export const Container = styled.main`
  position: relative;
  background-image: url(${clinica});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
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
