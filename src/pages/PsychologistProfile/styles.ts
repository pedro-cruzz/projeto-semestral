import styled from "styled-components";
import { theme } from "../../styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.WHITE};
`;

export const Separator = styled.div`
  width: 770px;
  background-color: ${theme.colors.DARK_GREEN};
  height: 2px;
  margin-bottom: 80px;
`;

export const ArticlesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
`;

export const Image = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  object-fit: cover;
`;
