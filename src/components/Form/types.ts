export type IFormVariant = "name" | "tel" | "email" | "button-cadastrar";

export interface IFormProps {
  variant?: IFormVariant;
  children: React.ReactNode;
  onClick?: () => void;
  width?: string;
  height?: string;
}