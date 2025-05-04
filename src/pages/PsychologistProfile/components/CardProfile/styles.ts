import styled from "styled-components";
import { theme } from "../../../../styles/theme";

export const Container = styled.div`
  border: 1px solid ${theme.colors.DARK_GREEN};
  border-radius: 20px;
  height: 454px;
  width: 740px;
  background-color: ${theme.colors.PURE_WHITE};
`;

export const ContainerCardProfile = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 80px;
  margin-block: 80px;
`;

export const Content = styled.div`
  padding: 40px 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const EditImage = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export const Text = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Name = styled.span`
  font-family: ${theme.fonts.mulish};
  color: ${theme.colors.DARK_GREEN};
  font-size: 16px;
  font-weight: 700;
`;

export const CRP = styled.span`
  font-family: ${theme.fonts.mulish};
  color: ${theme.colors.DARK_GREEN};
  font-size: 16px;
`;

export const Label = styled.label`
  font-family: ${theme.fonts.mulish};
  color: ${theme.colors.DARK_GREEN};
  font-size: 16px;
  font-weight: 700;
`;

export const TextMedia = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 60px;
  padding-top: 20px;
`;

export const SocialMedia = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: 20px;
`;

export const ImageMedia = styled.img`
  width: 24px;
  height: 24px;
  align-self: baseline;
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.1);
  }
`;

export const Divider = styled.div`
  margin-block: 20px;
  width: 420px;
  height: 1px;
  background-color: ${theme.colors.DARK_GREEN};
`;

export const About = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const TitleAbout = styled.span`
  font-family: ${theme.fonts.mulish};
  color: ${theme.colors.DARK_GREEN};
  font-size: 20px;
  font-weight: 700;
`;

export const TextAbout = styled.p`
  font-family: ${theme.fonts.mulish};
  color: ${theme.colors.DARK_GREEN};
  font-size: 16px;
`;
