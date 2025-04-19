import { Button } from "../../Button";
import { Fields, FormContainer, Subtitle, Title } from "./styles";
import { IAuthFormLayoutProps } from "./types";

export const AuthFormLayout = ({
  title,
  subtitle,
  children,
  buttonLabel,
  afterButton,
  onSubmit,
}: IAuthFormLayoutProps) => {
  return (
    <FormContainer onSubmit={onSubmit}>
      <Title>{title}</Title>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
      <Fields>{children}</Fields>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
      >
        <Button $variant="secondary" width="220px" fontWeight="400">
          {buttonLabel}
        </Button>
      </div>
      {afterButton && <div>{afterButton}</div>}
    </FormContainer>
  );
};
