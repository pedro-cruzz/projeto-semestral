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
      <h2>Cadastre-se e faça parte dessa rede de acolhimento</h2>

      <InputField
        label="Nome"
        name="name"
        value={formData.name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.name ? errors.name : undefined}
        required
      />

      <InputField
        label="Telefone"
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
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.email ? errors.email : undefined}
        required
      />

      <Button
        $variant="secondary"
        type="submit"
        disabled={!isValid || isSubmitting}
        width="285px"
      >
        {isSubmitting ? "Cadastrando..." : "Cadastrar"}
      </Button>
    </FormContainer>
  );
}
