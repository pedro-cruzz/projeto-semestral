import styled from "styled-components";
import { theme } from "../../styles/theme";

export const Content = styled.div`
  background-color: ${theme.colors.DARK_GREEN};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-block: 100px;
`;

export const Card = styled.div`
  background-color: ${theme.colors.WHITE};
  display: flex;
  flex-direction: column;
  gap: 60px;
  justify-content: center;
  align-items: center;
  width: 960px;
  border-radius: 20px;
  padding-block: 50px;
  margin-bottom: 50px;
`;

export const Title = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: ${theme.colors.DARK_GREEN};
  font-family: ${theme.fonts.mulish};
`;

export const Users = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  justify-content: center;
  align-items: center;
`;

export const User = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  padding: 16px;

  &.disabled {
    opacity: 0.5;
    pointer-events: none;
    filter: grayscale(100%);
  }
`;
export const UserImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  border: 10px solid ${theme.colors.GRAY};
`;

export const ContentButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
