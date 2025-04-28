import styled from "styled-components";
import { theme } from "../../styles/theme";

export const FooterContainer = styled.div<{
  $variant: "primary" | "secondary";
}>`
  display: flex;
  flex-direction: column;
  border-top: 5px solid rgba(189, 188, 188, 0.77);
  background-color: ${({ $variant }) =>
    $variant === "primary" ? theme.colors.WHITE : theme.colors.DARK_GREEN};
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

export const ContentText = styled.div<{ $variant: "primary" | "secondary" }>`
  display: flex;
  flex-direction: column;
  color: ${({ $variant }) =>
    $variant === "primary" ? theme.colors.DARK_GREEN : theme.colors.WHITE};
`;

export const SocialMedia = styled.div<{ $variant: "primary" | "secondary" }>`
  display: flex;
  flex-direction: column;
  color: ${({ $variant }) =>
    $variant === "primary" ? theme.colors.DARK_GREEN : theme.colors.WHITE};
  gap: 14px;
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
  font-weight: 700;
`;

export const Text = styled.p`
  font-family: ${theme.fonts.mulish};
  font-size: 20px;
`;
