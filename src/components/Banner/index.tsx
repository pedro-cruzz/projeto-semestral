import { IBannerProps } from "./types";

export function Banner({ children, image, height }: IBannerProps) {
  return (
    <section
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: `${height}`,
        position: "relative",
      }}
    >
      {children}
    </section>
  );
}
