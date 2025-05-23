import styled from "styled-components";
import { theme } from "../../styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.WHITE};
`;

export const Separator = styled.div`
  width: 770px;
  background-color: ${theme.colors.DARK_GREEN};
  height: 2px;
  margin-bottom: 80px;
`;

export const ArticlesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

export const Image = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  object-fit: cover;
`;

export const Title = styled.h1`
  font-family: ${theme.fonts.playfair};
  color: ${theme.colors.DARK_GREEN};
`;

export const ContainerCardArticles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px; /* espaçamento entre cada carousel */
  width: 100%; /* garante full-width */
`;

export const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  overflow: hidden;
  background-color: ${theme.colors.WHITE};
  color: ${theme.colors.DARK_GREEN};

  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }
`;

export const ButtonBack = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: 30%;
  left: 10%;
  cursor: pointer;
  transition: background-color 0.3s;
`;
