// src/pages/Login.tsx (ou LoginForm.tsx)
import { useState, useContext, useEffect } from "react";
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

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();

  // 1) Ao montar, tenta carregar credenciais salvas
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberEmail");
    const savedSenha = localStorage.getItem("rememberSenha");
    if (savedEmail && savedSenha) {
      setEmail(savedEmail);
      setSenha(savedSenha);
      setLembrar(true);
    }
  }, []);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = () => {
    let isValid = true;

    if (!email.trim()) {
      setEmailError("Email é obrigatório");
      isValid = false;
    } else {
      setEmailError(null);
    }

    if (!senha.trim()) {
      setPasswordError("Senha é obrigatória");
      isValid = false;
    } else {
      setPasswordError(null);
    }

    if (email && !validateEmail(email)) {
      setEmailError("Email inválido");
      isValid = false;
    }

    return isValid;
  };

  const onSubmit = async () => {
    if (!validateForm()) return;

    try {
      await signIn(email, senha);

      // 2) Lógica de lembrar senha
      if (lembrar) {
        localStorage.setItem("rememberEmail", email);
        localStorage.setItem("rememberSenha", senha);
      } else {
        localStorage.removeItem("rememberEmail");
        localStorage.removeItem("rememberSenha");
      }

      navigate("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Credenciais inválidas");
    }
  };

  return (
    <AuthFormLayout
      title="Olá, seja bem-vindo de volta!"
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
              to="/choose-register"
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
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError(null);
          }}
          label="Email"
          error={emailError || ""}
          helperText={emailError || ""}
        />

        <PasswordField
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => {
            setSenha(e.target.value);
            setPasswordError(null);
          }}
          label="Senha"
          error={passwordError || ""}
          helperText={passwordError || ""}
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
