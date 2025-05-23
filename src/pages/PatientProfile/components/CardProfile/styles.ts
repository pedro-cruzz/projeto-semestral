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
  font-size: 20px;
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

export const TextAbout = styled.textarea`
  font-family: ${theme.fonts.mulish};
  color: ${theme.colors.DARK_GREEN};
  font-size: 16px;
  height: 120px;
  border: none;
  resize: none;
  outline: none;
  padding: 0; // Adicionar
  background: transparent; // Adicionar
  overflow-y: auto; // Adicionar rolagem se necessário

  // Estilo para modo de edição (se necessário posteriormente)
  &:not([readonly]) {
    border: 1px solid ${theme.colors.LIGHT_GREEN};
    padding: 8px;
    border-radius: 4px;
  }
`;

export const Icons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  gap: 20px;
  margin-bottom: 20px;
`;
