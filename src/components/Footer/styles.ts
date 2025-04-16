import styled from "styled-components";
import { theme } from "../../styles/theme";

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 5px solid rgba(189, 188, 188, 0.77);
  color: ${({ color }) => color || theme.colors.DARK_GREEN};
`;

export const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem 2rem;
`;

// Novo: Wrapper para alinhar itens da esquerda
export const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

// Novo: Wrapper para alinhar itens da direita
export const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const Address = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Contact = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SocialMedia = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ color }) => color || theme.colors.DARK_GREEN};
  gap: 14px;
`;

export const Privacity = styled.div`
  display: flex;
  flex-direction: column;
  font-family: ${theme.fonts.mulish};
`;

export const Copy = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding-bottom: 10px;
`;

export const Title = styled.h2`
  font-family: ${theme.fonts.mulish};
  font-size: 24px;
  color: ${({ color }) => color || theme.colors.DARK_GREEN};
  font-weight: 700;
`;

export const Text = styled.p`
  font-family: ${theme.fonts.mulish};
  font-size: 20px;
  color: ${({ color }) => color || theme.colors.DARK_GREEN};
`;
