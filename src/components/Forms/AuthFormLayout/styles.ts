import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const FormContainer = styled.form`
  background-color: #fff;
  padding: 2rem;
  border-radius: 1rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Title = styled.h2`
  text-align: center;
  color: ${theme.colors.DARK_GREEN};
  font-family: ${theme.fonts.mulish};
  font-size: 20px;
  font-weight: 700;
`;

export const Subtitle = styled.p`
  text-align: center;
  color: ${theme.colors.DARK_GREEN};
  font-family: ${theme.fonts.mulish};
  font-size: 12px;
`;

export const Fields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: ${theme.colors.DARK_GREEN};
  font-family: ${theme.fonts.mulish};
`;

export const SubmitButton = styled.button`
  background-color: #2f3e1c;
  color: white;
  border: none;
  padding: 0.9rem;
  border-radius: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s ease-in;

  &:hover {
    background-color: #3c4f25;
  }
`;
