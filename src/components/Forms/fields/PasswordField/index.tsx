import { useState } from "react";
import { Input, Toggle, Wrapper } from "./styles";
import { IPasswordFieldProps } from "./types";

export const PasswordField = ({
  value,
  onChange,
  placeholder,
}: IPasswordFieldProps) => {
  const [show, setShow] = useState(false);

  return (
    <Wrapper>
      <Input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <Toggle onClick={() => setShow(!show)}>{show ? "🙈" : "👁️"}</Toggle>
    </Wrapper>
  );
};
