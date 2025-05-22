// src/pages/PsychologistsArticle/styles.ts
import styled from "styled-components";
import { theme } from "../../styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: ${theme.colors.WHITE};
`;

export const Header = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;

  width: 100%;
`;

export const ContentTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
  width: 100%;
  max-width: 600px;
  flex: 1;
  min-width: 0;
`;

export const Image = styled.img`
  width: 100%;
  max-width: 600px;
  height: 400px;
  border-radius: 10px;
  object-fit: cover;
`;

export const Title = styled.h1`
  font-family: ${theme.fonts.playfair};
  color: ${theme.colors.DARK_GREEN};
  font-size: 40px;
  white-space: normal;
  overflow-wrap: break-word;
  word-break: break-word;
`;

export const Subtitle = styled.h4`
  font-family: ${theme.fonts.mulish};
  color: ${theme.colors.DARK_GREEN};
  font-size: 20px;
  white-space: normal;
  overflow-wrap: break-word;
  word-break: break-word;
`;

export const CreatedAt = styled.small`
  font-family: ${theme.fonts.mulish};
  color: ${theme.colors.DARK_GREEN};
`;

export const Divider = styled.div`
  width: 100%;
  max-width: 775px;
  height: 1px;
  background-color: ${theme.colors.DARK_GREEN};
  margin: 80px 0;
`;

export const ContainerContent = styled.div`
  width: 100%;
  max-width: 950px;
  background-color: ${theme.colors.PURE_WHITE};
  padding: 60px;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);

  /* garante que o wrapper interno livre overflow horizontal */
  overflow-x: hidden;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  max-height: 1400px; /* altura máxima antes de rolar */
  overflow-y: auto; /* só rolagem vertical */
  overflow-x: hidden; /* sem scroll horizontal */
`;

export const Content = styled.p`
  white-space: pre-wrap; /* preserva quebras de linha */
  word-break: break-word; /* evita overflow de palavras longas */
  font-family: ${theme.fonts.mulish};
  color: ${theme.colors.DARK_GREEN};
  margin: 0;
`;

export const ButtonBack = styled.div`
  display: flex;
  position: absolute;
  top: 30%;
  left: 3%;
  cursor: pointer;
  transition: background-color 0.3s;
`;

export const Icon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export const Icons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  gap: 20px;
  align-items: baseline;
  margin-bottom: 10px;
  margin-right: 10px;
`;

export const ContentActions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: end;
  gap: 10px;
`;
