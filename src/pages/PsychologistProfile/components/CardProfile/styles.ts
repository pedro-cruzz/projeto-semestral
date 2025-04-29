import styled from "styled-components";
import { theme } from "../../../../styles/theme";

export const Container = styled.div`
  border: 1px solid ${theme.colors.DARK_GREEN};
  border-radius: 20px;
  height: 454px;
  width: 740px;
`;

export const ContainerCardProfile = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 80px;
  margin-block: 80px;
`;
