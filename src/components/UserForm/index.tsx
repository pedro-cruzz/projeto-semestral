import { Button } from "../Button";
import { UserFormProps } from "./types";
import { FormContainer } from "./styles";
import { useUserForm } from "./hooks/useUserForm";
import { InputField } from "./components/InputField";

export function UserForm({
  onSubmit,
  initialData,
  resetOnSubmit = true,
}: UserFormProps) {
  const {
    formData,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
  } = useUserForm({
    onSubmit,
    initialData,
    resetOnSubmit,
  });

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h2>Cadastro de Usuário</h2>

      <InputField
        label="Nome"
        id="name"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.name ? errors.name : undefined}
        required
      />

      <InputField
        label="Telefone"
        id="phone"
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.phone ? errors.phone : undefined}
        maxLength={15}
        required
      />

      <InputField
        label="E-mail"
        id="email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.email ? errors.email : undefined}
        required
      />

      <Button
        variant="secondary"
        type="submit"
        disabled={!isValid || isSubmitting}
      >
        {isSubmitting ? "Cadastrando..." : "Cadastrar"}
      </Button>
    </FormContainer>
  );
}
