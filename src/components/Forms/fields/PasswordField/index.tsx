import { useState } from "react";
import { Input, Toggle, Wrapper } from "./styles";
import { IPasswordFieldProps } from "./types";
import { LabelInputField } from "../InputField/styles";

export const PasswordField = ({
  value,
  onChange,
  placeholder,
  label,
  error,
  helperText,
}: IPasswordFieldProps) => {
  const [show, setShow] = useState(false);

  return (
    <Wrapper>
      <LabelInputField>{label}</LabelInputField>
      <Input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <Toggle onClick={() => setShow(!show)}>{show ? "🙈" : "👁️"}</Toggle>
      {error && (
        <span style={{ color: "red", fontSize: "12px" }}>{helperText}</span>
      )}
    </Wrapper>
  );
};
