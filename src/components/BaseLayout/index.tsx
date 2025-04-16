import { Footer } from "../Footer";
import { Header } from "../Header";
import { IBaseLayoutProps } from "./types";

export function BaseLayout({ children }: IBaseLayoutProps) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
