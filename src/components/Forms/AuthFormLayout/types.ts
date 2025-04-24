import { ReactNode } from "react";

export interface IAuthFormLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  buttonLabel: string;
  onSubmit: (e: React.FormEvent) => void;
  afterButton?: ReactNode;
  maxWidth: string;
}
