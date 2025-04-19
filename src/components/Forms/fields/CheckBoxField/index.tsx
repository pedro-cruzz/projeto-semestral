import { StyledCheckbox, Wrapper } from "./styles";
import { ICheckBoxProps } from "./types";

export const CheckboxWithLabel = ({
  label,
  checked,
  onChange,
}: ICheckBoxProps) => (
  <Wrapper>
    <StyledCheckbox checked={checked} onChange={onChange} />
    <span>{label}</span>
  </Wrapper>
);
