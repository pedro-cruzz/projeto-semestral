import styled from "styled-components";
import { theme } from "../../../../styles/theme";

export const Container = styled.div`
  background-color: ${theme.colors.PURE_WHITE};
  padding: 20px;
  border-radius: 30px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 288px;
  gap: 30px;
`;

export const ContentText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Title = styled.h2`
  font-family: ${theme.fonts.mulish};
  color: ${theme.colors.DARK_GREEN};
  font-size: 20px;
  font-weight: bold;
`;

export const Description = styled.p`
  color: ${theme.colors.DARK_GREEN};
`;

export const Image = styled.img`
  width: 288px;
  height: 233px;
  border-radius: 30px;
`;
