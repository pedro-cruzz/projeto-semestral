import { ChangeEvent, FocusEvent } from "react";
import { InputContainer } from "../../styles";

interface InputFieldProps {
  label: string;
  id: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  maxLength?: number;
}

export function InputField({
  label,
  id,
  name,
  type,
  value,
  onChange,
  onBlur,
  error,
  required,
  maxLength,
}: InputFieldProps) {
  return (
    <InputContainer $hasError={!!error}>
      <label htmlFor={id}>
        {label}
        {required && " *"}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        maxLength={maxLength}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p id={`${id}-error`} className="error-message" role="alert">
          {error}
        </p>
      )}
    </InputContainer>
  );
}
