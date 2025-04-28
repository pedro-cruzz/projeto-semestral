export type IBaseLayoutVariant = "primary" | "secondary";

export interface IBaseLayoutProps {
  children: React.ReactNode;
  $variant?: IBaseLayoutVariant;
}
