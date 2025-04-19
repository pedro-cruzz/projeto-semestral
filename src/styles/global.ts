import { createGlobalStyle } from "styled-components";
import { theme } from "./theme";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
  }

  body {
    -webkit-font-smoothing: antialiased;
     font-family: ${theme.fonts.mulish}, sans-serif; // Aplicando mulish como fonte padrão
  }

  // font-size: 16px (padrao-Desktop)
  html {
    p {
       font-family: ${theme.fonts.mulish}, sans-serif;
    }

    @media (max-width: 720px) {
      /* font-size: 87.5%; // 14px */
      font-size: 16px;
      p {
        font-size: 16px !important;
      }
    }
  }

  /* Sobreescrevendo a fonte de todos eles */
  body, input, textarea, button, p, span {
     font-family: ${theme.fonts.mulish}, sans-serif; // Aplicando mulish para todos os elementos
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 600;
    font-family: ${theme.fonts.playfair}; // Aplicando playfair para títulos
  }

  button {
    cursor: pointer;
  }

  // stylizando tudo que está desabilitado
  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  a {
    color: inherit;
    text-decoration: none;}
`;
