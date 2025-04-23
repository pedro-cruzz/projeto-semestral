import { useState } from "react";
import { AuthFormLayout } from "../AuthFormLayout";
import { PasswordField } from "../fields/PasswordField";
import { InputFieldComponent } from "../fields/InputField";
import { useSearchParams } from "react-router-dom";

export const RegisterForm = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [crp, setCrp] = useState("");
  const [senha, setSenha] = useState("");

  const onSubmit = () => {
    console.log({ nome, email, crp, senha });
    // lógica de cadastro
  };

  const [searchParams] = useSearchParams();

  const userType = searchParams.get("type"); // "psicologo" | "paciente" | null

  return (
    <AuthFormLayout
      title="Crie uma nova conta"
      buttonLabel="Continuar"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <InputFieldComponent
        label="Nome"
        placeholder="Digite seu nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <InputFieldComponent
        label="Email"
        placeholder="Digite seu Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {userType === "psicologo" && (
        <InputFieldComponent
          label="CRP"
          placeholder="Conselho Regional de Psicologia"
          value={crp}
          onChange={(e) => setCrp(e.target.value)}
        />
      )}

      <PasswordField
        label="Senha"
        placeholder="Mínimo 8 dígitos"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
    </AuthFormLayout>
  );
};
