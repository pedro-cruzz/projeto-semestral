import { Footer } from "../Footer";
import { Header } from "../Header";
import { IBaseLayoutProps } from "./types";

export function BaseLayout({ children, $variant }: IBaseLayoutProps) {
  return (
    <div>
      <Header $variant={$variant} />
      {children}
      <Footer $variant={$variant} />
    </div>
  );
}
