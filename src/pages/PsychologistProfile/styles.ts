import styled from "styled-components";
import { theme } from "../../styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Separator = styled.div`
  width: 770px;
  background-color: ${theme.colors.DARK_GREEN};
  height: 2px;
  margin-bottom: 80px;
`;
