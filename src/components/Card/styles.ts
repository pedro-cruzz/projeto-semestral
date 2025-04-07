import styled from "styled-components";
import { theme } from "../../styles/theme";

export const Container = styled.div`
  background-color: ${theme.colors.DARK_GREEN};
  width: 238px;
  border-radius: 20px;
  padding: 20px;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 14px;
`;

export const CardTitle = styled.h2`
  font-size: 22px;
  color: ${theme.colors.WHITE};
  font-family: ${theme.fonts.switzer};
  font-weight: bold;
`;

export const CardDescription = styled.p`
  font-size: 14px;
  color: ${theme.colors.WHITE};
  font-family: ${theme.fonts.switzer};
  font: small-caption;
`;
