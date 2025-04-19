import styled from "styled-components";
import { theme } from "../../../../styles/theme";

export const Wrapper = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 14px;
  font-family: ${theme.fonts.mulish};
  cursor: pointer;

  span {
    color: ${theme.colors.DARK_GREEN};
  }
`;

export const StyledCheckbox = styled.input.attrs({ type: "checkbox" })`
  appearance: none;
  width: 16px;
  height: 16px;
  border: 1px solid ${theme.colors.DARK_GREEN};
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;

  &:checked {
    background-color: ${theme.colors.DARK_GREEN};
    border-color: ${theme.colors.DARK_GREEN};
  }

  &:checked::after {
    content: "";
    position: absolute;
    top: 1px;
    left: 4px;
    width: 4px;
    height: 8px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;
