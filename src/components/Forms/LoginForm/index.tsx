// src/pages/Login.tsx (ou LoginForm.tsx, conforme sua organização)
import { useState, useContext } from "react";

import {
  ForgotPassword,
  Inputs,
  RegisterParagraph,
  RegisterParagraphContainer,
} from "./styles";
import { AuthContext } from "../../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { AuthFormLayout } from "../AuthFormLayout";
import { InputFieldComponent } from "../fields/InputField";
import { PasswordField } from "../fields/PasswordField";
import { CheckboxWithLabel } from "../fields/CheckBoxField";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [lembrar, setLembrar] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      await signIn(email, senha);
      // Redireciona para a página desejada após o login (exemplo: dashboard ou homepage protegida)
      navigate("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Falha no login. Verifique suas credenciais.");
    }
  };

  return (
    <AuthFormLayout
      title={"Olá, seja bem-vindo de volta!"}
      subtitle="É muito bom ter você conosco novamente"
      buttonLabel="Entrar"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      maxWidth="400px"
      afterButton={
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            alignItems: "center",
            marginTop: "2rem",
          }}
        >
          <RegisterParagraphContainer>
            <RegisterParagraph>Não tem uma conta?</RegisterParagraph>
            <Link
              to={"/choose-register"}
              style={{ fontWeight: "bold", textDecoration: "underline" }}
            >
              Cadastre-se já!
            </Link>
          </RegisterParagraphContainer>
        </div>
      }
    >
      <Inputs>
        <InputFieldComponent
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
        />
        <PasswordField
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          label="Senha"
        />
      </Inputs>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "0.2rem",
        }}
      >
        <CheckboxWithLabel
          label="Lembrar senha"
          checked={lembrar}
          onChange={(e) => setLembrar(e.target.checked)}
        />
        <ForgotPassword>Esqueceu sua senha?</ForgotPassword>
      </div>
      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
    </AuthFormLayout>
  );
};
