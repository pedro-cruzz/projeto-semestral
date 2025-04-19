import { useState } from "react";
import { AuthFormLayout } from "../AuthFormLayout";
import { PasswordField } from "../fields/PasswordField";
import { CheckboxWithLabel } from "../fields/CheckBoxField";
import {
  ButtonGoogle,
  ForgotPassword,
  Inputs,
  RegisterParagraph,
  RegisterParagraphContainer,
} from "./styles";

import google from "./../../../assets/png/Google.png";
import { Link } from "react-router-dom";
import { InputFieldComponent } from "../fields/InputField";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [lembrar, setLembrar] = useState(false);

  const onSubmit = () => {
    console.log({ email, senha, lembrar });
    // lógica de autenticação
  };

  return (
    <AuthFormLayout
      title="Olá, seja bem vindo de volta!"
      subtitle="É muito bom ter você conosco novamente"
      buttonLabel="Entrar"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
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
          <ButtonGoogle>
            <img src={google} alt="Google" style={{ width: "24px" }} />
            Entrar com o Google
          </ButtonGoogle>
          <RegisterParagraphContainer>
            <RegisterParagraph>Não tem uma conta?</RegisterParagraph>
            <Link
              to="/cadastro"
              style={{
                fontWeight: "bold",
                textDecoration: "underline",
              }}
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
    </AuthFormLayout>
  );
};
