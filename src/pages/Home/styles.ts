import styled from "styled-components";
import { theme } from "../../styles/theme";
import { ContentContainerProps } from "./types";

export const TitleForm = styled.h1`
  font-size: 2rem;
  display: flex;
  font-weight: 700;
  color: ${theme.colors.DARK_GREEN};
  text-align: center;
  justify-content: center;
  margin: 4rem auto;
  font-family: ${theme.fonts.playfair};
  width: 100%;
  max-width: 850px;
`;

export const TextForm = styled.p`
  display: flex;
  font-size: 24px;
  font-weight: 400;
  color: ${theme.colors.DARK_GREEN};
  text-align: center;
  justify-content: center;
  align-items: center;
  margin: 2rem auto 4rem auto;
  width: 100%;
  max-width: 882px;
  font-family: ${theme.fonts.mulish};
`;

export const ChatAlert = styled.div`
  background-color: ${theme.colors.DARK_GREEN};
  color: ${theme.colors.WHITE};
  height: 400px;
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 2rem;
  border-top: 1px white solid;
`;

export const TitleChat = styled.h1`
  font-size: 40px;
  font-weight: 700;
  color: ${theme.colors.WHITE};
  text-align: center;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 882px;
  font-family: ${theme.fonts.playfair};
`;

export const TextChat = styled.p`
  font-size: 20px;
  font-weight: 400;
  color: ${theme.colors.WHITE};
  text-align: center;
  justify-content: center;
  align-items: center;
  margin: 2rem auto 1rem auto;
  width: 100%;
  max-width: 800px;
  font-family: ${theme.fonts.mulish};
`;

export const Cards = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 50px;
`;

export const ContentContainer = styled.div<ContentContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: ${({ $align = "left" }) =>
    $align === "center" ? "center" : "flex-start"};
  gap: 1rem;
  position: absolute;
  top: ${({ $top = "auto" }) => $top};
  bottom: ${({ $bottom = "auto" }) => $bottom};
  left: ${({ $left = "auto" }) => $left};
  right: ${({ $right = "auto" }) => $right};
`;

export const TitleBanner = styled.h1`
  font-size: 40px;
  font-weight: 700;
  font-family: ${theme.fonts.playfair};
  color: ${({ color }) => color || theme.colors.WHITE};
`;

export const TextBanner = styled.p`
  font-size: 20px;
  font-weight: 400;
  font-family: ${theme.fonts.mulish};
  color: ${({ color }) => color || theme.colors.WHITE};
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
