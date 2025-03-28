import styled from "styled-components";
import { IButtonVariant } from "./types";
import { theme } from "../../styles/theme";

export const StyledButton = styled.button<{
  variant?: IButtonVariant;
  width?: string;
  height?: string;
}>`
  padding: 12px 24px;
  border: none;
  border-radius: 60px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  width: ${({ width }) => width || "auto"};
  height: ${({ height }) => height || "auto"};
  font-family: ${theme.fonts.switzer};

  // Estilos para a variante primary
  ${({ variant }) =>
    variant === "primary" &&
    `
    background-color: ${theme.colors.WHITE};
    color: ${theme.colors.DARK_GREEN};

    &:hover {
      background-color:${theme.colors.DARK_GREEN};
      color: ${theme.colors.WHITE};
    }
  `}

  // Estilos para a variante secondary
  ${({ variant }) =>
    variant === "secondary" &&
    `
      background-color:${theme.colors.DARK_GREEN};
      color: ${theme.colors.WHITE};
    &:hover {
       background-color: ${theme.colors.WHITE};
       color: ${theme.colors.DARK_GREEN};
    }
  `}
`;
