import styled from "styled-components";
import { theme } from "../../styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: ${theme.colors.WHITE};
  padding-block: 80px;
  gap: 40px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 800px;
  gap: 1rem;
  align-items: center;
`;

export const Title = styled.h1`
  font-family: ${theme.fonts.mulish};
  color: ${theme.colors.DARK_GREEN};
  font-size: 40px;
`;

export const Wrapper = styled.div`
  background-color: ${theme.colors.WHITE};
`;
