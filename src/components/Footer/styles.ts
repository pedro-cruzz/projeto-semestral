import styled from "styled-components";
import { theme } from "../../styles/theme";

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-top: 5px solid rgba(189, 188, 188, 0.77);
  color: ${({ color }) => color || theme.colors.DARK_GREEN};
  height: 250px;
  position: relative;
`;

export const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: auto;
  margin-right: auto;
  max-width: 1200px;
  padding: 2rem 0;
  width: 100%;
  gap: 20px;
`;

// Novo: Wrapper para alinhar itens da esquerda
export const LeftSide = styled.div`
  display: flex;
  padding-right: 30px;
  margin-right: 10%;
  flex-direction: column;
  gap: 1rem;
  width: 50%;
`;

// Novo: Wrapper para alinhar itens da direita
export const RightSide = styled.div`
  padding-left: 30px;
  margin-left: 10%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 50%;
`;

export const Address = styled.div`
  display: flex;
  flex-direction: column;
  width: 510px;
`;

export const Contact = styled.div`
  display: flex;
  flex-direction: column;
  width: 510px;
`;

export const SocialMedia = styled.div`
  display: flex;
  flex-direction: column;
  width: 510px;
  gap: 10px;
  color: ${({ color }) => color || theme.colors.DARK_GREEN};
`;

export const Privacity = styled.div`
  display: flex;
  flex-direction: column;
  width: 510px;
`;

export const Copy = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-left: auto;
  margin-right:auto;
  padding: 30px;
  margin-bottom: 30px;
  width: fit-content;
  height: 20px;
`;
