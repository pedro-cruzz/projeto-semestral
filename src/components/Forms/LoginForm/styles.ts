import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const ForgotPassword = styled.span`
  font-size: 14px;
  color: ${theme.colors.DARK_GREEN};
  cursor: pointer;
`;

export const ButtonGoogle = styled.button`
  border: none;
  background-color: transparent;
  color: ${theme.colors.DARK_GREEN};
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const RegisterParagraphContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  font-size: 14px;
  color: ${theme.colors.DARK_GREEN};
`;

export const RegisterParagraph = styled.p``;

export const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 1rem;
`;
