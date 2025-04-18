import { StyledButton } from "./styles";
import { IButtonProps } from "./types";

export function Button({
  children,
  onClick,
  $variant = "primary",
  width,
  height,
  type = "button",
  disabled = false,
  borderRadius,
  fontWeight,
}: IButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <StyledButton
      $variant={$variant}
      onClick={onClick}
      width={width}
      height={height}
      type={type}
      disabled={disabled}
      borderRadius={borderRadius}
      fontWeight={fontWeight}
    >
      {children}
    </StyledButton>
  );
}
