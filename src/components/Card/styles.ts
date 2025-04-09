import styled from "styled-components";
import { theme } from "../../styles/theme";

export const Container = styled.div`
  background-color: ${theme.colors.DARK_GREEN};
  width: 238px;
  border-radius: 20px;
  padding: 20px;
  position: relative;
`;

export const CardContainer = styled.div<{ $hasIcon: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 6px;
  position: relative;
  width: 100%;
  height: ${({ $hasIcon }) => ($hasIcon ? "230px" : "340px")};
  padding-top: ${({ $hasIcon }) => ($hasIcon ? "20px" : "0px")};
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

export const Icon = styled.img`
  width: 50px;
  height: 50px;
  background-color: ${theme.colors.WHITE};
  padding: 6px;
  border-radius: 20px;
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
`;

export const Image = styled.img`
  width: 50px;
  height: 50px;
  background-color: ${theme.colors.WHITE};
  padding: 6px;
  border-radius: 20px;
`;
