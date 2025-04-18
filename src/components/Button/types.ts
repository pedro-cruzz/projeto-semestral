export type IButtonVariant = "primary" | "secondary";

export interface IButtonProps {
  $variant?: IButtonVariant;
  children: React.ReactNode;
  onClick?: () => void;
  width?: string;
  height?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  borderRadius?: string;
  fontWeight?: string;
}
