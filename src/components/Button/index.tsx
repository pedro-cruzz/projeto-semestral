import { StyledButton } from "./styles";
import { IButtonProps } from "./types";

export function Button({
  children,
  onClick,
  variant,
  width,
  height,
}: IButtonProps) {
  return (
    <StyledButton
      variant={variant}
      onClick={onClick}
      width={width}
      height={height}
    >
      {children}
    </StyledButton>
  );
}
