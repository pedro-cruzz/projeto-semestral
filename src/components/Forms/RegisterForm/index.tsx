import { useEffect, useState } from "react";
import { AuthFormLayout } from "../AuthFormLayout";
import { PasswordField } from "../fields/PasswordField";
import { InputFieldComponent } from "../fields/InputField";
import { useSearchParams } from "react-router-dom";
import { registerPsychologist } from "../../../services/registerPsychologist";

export const RegisterForm = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [crp, setCrp] = useState("");
  const [senha, setSenha] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [birthDate, setBirthDate] = useState("");
  const [activitiesStartDate, setActivitiesStartDate] = useState("");

  const [searchParams] = useSearchParams();
  const userType = searchParams.get("type"); // "psicologo" | "paciente" | null

  // Funções auxiliares para máscaras
  const applyCRPMask = (value: string) => {
    return value
      .replace(/\D/g, "") // Remove tudo que não é dígito
      .replace(/(\d{2})(\d)/, "$1/$2") // Coloca a barra após 2 dígitos
      .replace(/(\/\d{5})\d+?$/, "$1"); // Permite apenas 5 dígitos após a barra
  };

  const applyDateMask = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{2}\/\d{2})(\d)/, "$1/$2")
      .replace(/(\/\d{4})\d+?$/, "$1"); // Limita a 4 dígitos no ano
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrors({});
    }, 20000);
    return () => clearTimeout(timer);
  }, [errors]);

  const handleCrpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = applyCRPMask(e.target.value);
    setCrp(formattedValue);
    setErrors((prev) => ({ ...prev, crp: "" }));
  };

  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = applyDateMask(e.target.value);
    setBirthDate(formattedValue);
    setErrors((prev) => ({ ...prev, birthDate: "" }));
  };

  const handleActivitiesDateChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const formattedValue = applyDateMask(e.target.value);
    setActivitiesStartDate(formattedValue);
    setErrors((prev) => ({ ...prev, activitiesStartDate: "" }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!nome.trim()) newErrors.nome = "Nome é obrigatório.";
    if (!email.trim()) newErrors.email = "Email é obrigatório.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Email inválido.";

    if (senha.length < 8)
      newErrors.senha = "A senha deve ter ao menos 8 caracteres.";

    if (userType === "psicologo") {
      if (!crp.trim()) {
        newErrors.crp = "CRP é obrigatório.";
      } else if (!/^\d{2}\/\d{5}$/.test(crp)) {
        newErrors.crp = "Formato deve ser UF/99999 (ex: MG/34567).";
      }
      if (!birthDate.trim())
        newErrors.birthDate = "Data de nascimento é obrigatória.";
      if (!activitiesStartDate.trim())
        newErrors.activitiesStartDate = "Data de início é obrigatória.";

      const dateRegexBR = /^\d{2}\/\d{2}\/\d{4}$/;

      if (birthDate && !dateRegexBR.test(birthDate))
        newErrors.birthDate = "Formato deve ser DD/MM/AAAA.";

      if (activitiesStartDate && !dateRegexBR.test(activitiesStartDate))
        newErrors.activitiesStartDate = "Formato deve ser DD/MM/AAAA.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const convertDateToISO = (date: string) => {
    const [day, month, year] = date.split("/");
    return `${year}-${month}-${day}`;
  };

  const onSubmit = async () => {
    const isValid = validateForm(); // sua função de validação

    if (!isValid) {
      return; // erros já foram definidos dentro de validateForm
    }

    try {
      const userData = {
        email,
        password: senha,
      };

      if (userType === "psicologo") {
        const psychologistData = {
          name: nome,
          crp,
          birthDate: convertDateToISO(birthDate),
          activitiesStartDate: convertDateToISO(activitiesStartDate),
        };

        const response = await registerPsychologist(userData, psychologistData);
        console.log("Cadastro realizado com sucesso!", response);
        alert("Cadastro realizado com sucesso!");
      } else {
        alert("Tipo de usuário inválido ou não selecionado.");
      }
    } catch (err) {
      console.error("Erro no cadastro:", err);
      alert("Erro ao cadastrar.");
    }
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
      <InputFieldComponent
        label="Nome"
        placeholder="Digite seu nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        error={errors.nome}
      />
      <InputFieldComponent
        label="Email"
        placeholder="Digite seu Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
      />
      {userType === "psicologo" && (
        <>
          <InputFieldComponent
            label="CRP"
            placeholder="Conselho Regional de Psicologia"
            value={crp}
            onChange={handleCrpChange}
            error={errors.crp}
          />
          <InputFieldComponent
            label="Data de nascimento"
            placeholder="DD/MM/AAAA"
            value={birthDate}
            onChange={handleBirthDateChange}
            error={errors.birthDate}
          />

          <InputFieldComponent
            label="Início das atividades"
            placeholder="DD/MM/AAAA"
            value={activitiesStartDate}
            onChange={handleActivitiesDateChange}
            error={errors.activitiesStartDate}
          />
        </>
      )}
      <PasswordField
        label="Senha"
        placeholder="Mínimo 8 dígitos"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        error={errors.senha}
      />
    </AuthFormLayout>
  );
};
