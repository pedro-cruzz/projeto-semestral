import React from "react";
import { InputField, LabelInputField } from "./styles";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  label?: string;
  error?: string;
  helperText?: string;
}

export const InputFieldComponent = React.forwardRef<
  HTMLInputElement,
  InputFieldProps
>(({ placeholder, label, error, helperText, type = "text", ...props }, ref) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
    <LabelInputField>{label}</LabelInputField>
    <InputField type={type} placeholder={placeholder} ref={ref} {...props} />
    {error && (
      <span style={{ color: "red", fontSize: "12px" }}>{helperText}</span>
    )}
  </div>
));
