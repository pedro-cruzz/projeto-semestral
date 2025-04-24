import { Button } from "../../Button";
import { Fields, FormContainer, Subtitle, Title } from "./styles";
import { IAuthFormLayoutProps } from "./types";

export const AuthFormLayout = ({
  title,
  subtitle,
  children,
  buttonLabel,
  afterButton,
  maxWidth,
  onSubmit,
}: IAuthFormLayoutProps) => {
  return (
    <FormContainer onSubmit={onSubmit} maxWidth={maxWidth}>
      <Title>{title}</Title>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
      <Fields>{children}</Fields>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
      >
        <Button
          type="submit"
          $variant="secondary"
          width="220px"
          fontWeight="400"
        >
          {buttonLabel}
        </Button>
      </div>
      {afterButton && <div>{afterButton}</div>}
    </FormContainer>
  );
};
