import styled from "styled-components";
import { theme } from "../../styles/theme";

export const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  overflow: hidden;
  background-color: ${theme.colors.DARK_GREEN};
  color: ${theme.colors.WHITE};

  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  a {
    font-size: 1.2rem;
    color: ${theme.colors.DARK_GREEN};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;


