import { useState } from "react";
import { AuthFormLayout } from "../AuthFormLayout";
import { InputField } from "../fields/InputField/styles";
import { PasswordField } from "../fields/PasswordField";

export const RegisterForm = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [crp, setCrp] = useState("");
  const [senha, setSenha] = useState("");

  const onSubmit = () => {
    console.log({ nome, email, crp, senha });
    // lógica de cadastro
  };

  return (
    <AuthFormLayout
      title="Crie uma nova conta"
      buttonLabel="Continuar"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <InputField
        placeholder="Digite seu nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <InputField
        placeholder="Digite seu Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        placeholder="Conselho Regional de Psicologia"
        value={crp}
        onChange={(e) => setCrp(e.target.value)}
      />
      <PasswordField
        placeholder="Mínimo 8 dígitos"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <span style={{ fontSize: "0.85rem", color: "#555" }}>
        Sua senha deve ter pelo menos 8 caracteres
      </span>
    </AuthFormLayout>
  );
};
