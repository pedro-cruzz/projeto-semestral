import styled from "styled-components";
import { theme } from "../../../../styles/theme";

export const Wrapper = styled.div`
  position: relative;
`;

export const Input = styled.input`
  width: 100%;
  border: 1px solid ${theme.colors.LIGHT_GREEN};
  padding: 1rem 1rem 1rem 0.5rem;
  border-radius: 0.6rem;
  font-size: 12px;
  outline: none;
  font-family: ${theme.fonts.mulish};
  color: ${theme.colors.DARK_GREEN};

  &:focus {
    border: 2px solid ${theme.colors.LIGHT_GREEN};
  }
`;

export const Toggle = styled.span`
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 1.2rem;
`;
