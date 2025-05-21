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
  justify-content: space-between;
  align-items: center;
  gap: 20px;
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
  width: 600px;
  height: 400px;
  border-radius: 10px;
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
  width: 775px;
  height: 1px;
  background-color: ${theme.colors.DARK_GREEN};
  margin-block: 80px;
`;

export const ContainerContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.PURE_WHITE};
  width: 950px;
  height: 100%;
  max-height: 1330px;
  padding: 60px;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
`;

export const ContentWrapper = styled.div`
  overflow-y: auto;
  height: 100%;
`;

export const Content = styled.p``;

export const ButtonBack = styled.div`
  display: flex;
  position: absolute;
  top: 34%;
  left: 4%;
  cursor: pointer;
  transition: background-color 0.3s;
`;
