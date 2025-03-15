import { createGlobalStyle } from "styled-components";
import { theme } from "./theme";

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Boska';
    src: url('/assets/fonts/boska/Boska-Regular.woff2') format('woff2'),
         url('/assets/fonts/boska/Boska-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Boska';
    src: url('/assets/fonts/boska/Boska-Bold.woff2') format('woff2'),
         url('/assets/fonts/boska/Boska-Bold.woff') format('woff');
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: 'Switzer';
    src: url('/assets/fonts/switzer/Switzer-Regular.woff2') format('woff2'),
         url('/assets/fonts/switzer/Switzer-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Switzer';
    src: url('/assets/fonts/switzer/Switzer-Bold.woff2') format('woff2'),
         url('/assets/fonts/switzer/Switzer-Bold.woff') format('woff');
    font-weight: 700;
    font-style: normal;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
  }

  body {
    font-size: 100%;
    -webkit-font-smoothing: antialiased;
     font-family: ${theme.fonts.switzer}, sans-serif; // Aplicando Switzer como fonte padrão
  }

  // font-size: 16px (padrao-Desktop)
  html {
    p {
      font-size: 18px !important;
       font-family: ${theme.fonts.switzer}, sans-serif;
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
     font-family: ${theme.fonts.switzer}, sans-serif; // Aplicando Switzer para todos os elementos
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 600;
    font-family: ${theme.fonts.boska}; // Aplicando Boska para títulos
  }

  button {
    cursor: pointer;
  }

  // stylizando tudo que está desabilitado
  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
