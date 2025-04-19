// components/forms/fields/InputField.tsx
import styled from "styled-components";
import { theme } from "../../../../styles/theme";

export const InputField = styled.input`
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

export const LabelInputField = styled.label`
  font-size: 12px;
  color: ${theme.colors.DARK_GREEN};
  font-family: ${theme.fonts.mulish};
`;
