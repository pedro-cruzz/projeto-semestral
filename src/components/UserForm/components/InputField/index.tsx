import { InputContainer } from "../../styles";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function InputField({
  label,
  error,
  type = "text",
  ...rest
}: InputFieldProps) {
  const { id, required } = rest;

  return (
    <InputContainer $hasError={!!error}>
      <label htmlFor={id}>
        {label}
        {required && " *"}
      </label>
      <input
        {...rest}
        type={type}
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
