import { useContext, useEffect, useState } from "react";
import { AuthFormLayout } from "../AuthFormLayout";
import { PasswordField } from "../fields/PasswordField";
import { InputFieldComponent } from "../fields/InputField";
import { useSearchParams, useNavigate } from "react-router-dom";
import { registerPsychologist } from "../../../services/registerPsychologist";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { ContainerInputs } from "./styles";
import { AuthContext } from "../../../contexts/AuthContext"; // ajuste o caminho conforme sua estrutura

export const RegisterForm = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [crp, setCrp] = useState("");
  const [senha, setSenha] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSucessMessage, setSucessAlertMessage] = useState("");
  const [alertErrorMessage, setErrorAlertMessage] = useState("");

  const [birthDate, setBirthDate] = useState("");
  const [activitiesStartDate, setActivitiesStartDate] = useState("");

  const [searchParams] = useSearchParams();
  const userType = searchParams.get("type"); // "psicologo" | "paciente" | null

  const navigate = useNavigate(); // Hook para redirecionar
  const { signIn } = useContext(AuthContext);

  const applyCRPMask = (value: string) => {
    const cleaned = value.toUpperCase().replace(/[^A-Z0-9/]/g, "");
    const uf = cleaned.match(/^[A-Z]{0,2}/)?.[0] || "";
    const numbers = cleaned.slice(uf.length).replace(/\D/g, "").slice(0, 5);
    let result = uf;
    if (uf.length >= 2) {
      result = `${uf.slice(0, 2)}/${numbers}`;
    }
    return result.slice(0, 8);
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
    const { value, selectionStart } = e.target;
    const originalCursorPosition = selectionStart || 0;
    const formattedValue = applyCRPMask(value);
    let newCursorPosition = originalCursorPosition;
    if (formattedValue.length > value.length && formattedValue.includes("/")) {
      newCursorPosition += 1;
    } else if (formattedValue.length < value.length && value.includes("/")) {
      newCursorPosition -= 1;
    }
    setCrp(formattedValue);
    setErrors((prev) => ({ ...prev, crp: "" }));
    setTimeout(() => {
      e.target.setSelectionRange(newCursorPosition, newCursorPosition);
    }, 0);
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

  const validateForm = async () => {
    const newErrors: { [key: string]: string } = {};
    if (!nome.trim()) newErrors.nome = "Nome é obrigatório.";
    if (!email.trim()) newErrors.email = "Email é obrigatório.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Email inválido. Formato deve ser exemplo@gmail.com";
    if (email.trim()) {
      try {
        const checkEmail = await fetch(
          `http://localhost:3001/users?email=${email}`
        );
        const existingUsers = await checkEmail.json();
        if (existingUsers.length > 0) {
          newErrors.email = "Este email já está cadastrado";
        }
      } catch (err) {
        console.error("Erro na verificação de email:", err);
      }
    }

    if (senha.length < 8)
      newErrors.senha = "A senha deve ter ao menos 8 caracteres.";
    if (userType === "psicologo") {
      if (!crp.trim()) {
        newErrors.crp = "CRP é obrigatório.";
      } else if (!/^[A-Z]{2}\/\d{5}$/.test(crp)) {
        newErrors.crp = "Formato deve ser UF/99999 (ex: SP/12345)";
      }
      if (crp.trim()) {
        try {
          const response = await fetch(
            `http://localhost:3001/psychologists?crp=${crp}`
          );
          const existingCRPs = await response.json();
          if (existingCRPs.length > 0) {
            newErrors.crp = "CRP já cadastrado";
          }
        } catch (err) {
          console.error("Erro ao verificar CRP:", err);
        }
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

  useEffect(() => {
    const checkEmailAvailability = async () => {
      if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        try {
          const response = await fetch(
            `http://localhost:3001/users?email=${email}`
          );
          const existingUsers = await response.json();
          if (existingUsers.length > 0) {
            setErrors((prev) => ({
              ...prev,
              email: "Este email já está cadastrado",
            }));
          }
        } catch (err) {
          console.error("Erro na verificação de email:", err);
        }
      }
    };

    const debounceTimer = setTimeout(checkEmailAvailability, 500);
    return () => clearTimeout(debounceTimer);
  }, [email]);

  useEffect(() => {
    const checkCRP = async () => {
      if (crp && /^[A-Z]{2}\/\d{5}$/.test(crp)) {
        try {
          const response = await fetch(
            `http://localhost:3001/psychologists?crp=${crp}`
          );
          const existingCRPs = await response.json();
          if (existingCRPs.length > 0) {
            setErrors((prev) => ({ ...prev, crp: "CRP já cadastrado" }));
          }
        } catch (err) {
          console.error("Erro na verificação do CRP:", err);
        }
      }
    };

    const debounceTimer = setTimeout(checkCRP, 500);
    return () => clearTimeout(debounceTimer);
  }, [crp]);

  const convertDateToISO = (date: string) => {
    const [day, month, year] = date.split("/");
    return `${year}-${month}-${day}`;
  };

  const handleAlertClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  const onSubmit = async () => {
    const isValid = await validateForm();
    if (!isValid) {
      return;
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

        // Verifica onde está o id do psicólogo
        const psychologistId = response.psychologist.id;
        console.log("ID retornado:", psychologistId);

        setSucessAlertMessage(
          `Psicólogo: ${psychologistData.name} cadastrado com sucesso!`
        );
        setAlertOpen(true);

        // Efetue login e redirecione para o perfil com o id correto
        await signIn(email, senha);
        setTimeout(() => {
          navigate(`/psychologist-profile/${psychologistId}`);
        }, 1500);
      } else {
        setErrorAlertMessage("Tipo de usuário inválido ou não selecionado.");
        setAlertOpen(true);
      }
    } catch (err) {
      console.error("Erro no cadastro:", err);
      setErrorAlertMessage("Erro ao cadastrar.");
      setAlertOpen(true);
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
      maxWidth="800px"
    >
      <ContainerInputs>
        <InputFieldComponent
          label="Nome"
          placeholder="Digite seu nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          error={errors.nome}
          helperText={errors.nome}
        />
        <InputFieldComponent
          label="Email"
          placeholder="Digite seu Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors((prev) => ({ ...prev, email: "" }));
          }}
          error={errors.email}
          helperText={errors.email}
        />
      </ContainerInputs>

      {userType === "psicologo" && (
        <>
          <ContainerInputs>
            <InputFieldComponent
              label="CRP"
              placeholder="Conselho Regional de Psicologia"
              value={crp}
              onChange={handleCrpChange}
              error={errors.crp}
              helperText={errors.crp}
            />
            <InputFieldComponent
              label="Data de nascimento"
              placeholder="DD/MM/AAAA"
              value={birthDate}
              onChange={handleBirthDateChange}
              error={errors.birthDate}
              helperText={errors.birthDate}
            />
          </ContainerInputs>
          <ContainerInputs>
            <InputFieldComponent
              label="Início das atividades"
              placeholder="DD/MM/AAAA"
              value={activitiesStartDate}
              onChange={handleActivitiesDateChange}
              error={errors.activitiesStartDate}
              helperText={errors.activitiesStartDate}
            />
            <PasswordField
              label="Senha"
              placeholder="Mínimo 8 dígitos"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              error={errors.senha}
              helperText={errors.senha}
            />
          </ContainerInputs>
        </>
      )}
      {userType === "paciente" && (
        <PasswordField
          label="Senha"
          placeholder="Mínimo 8 dígitos"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          error={errors.senha}
          helperText={errors.senha}
        />
      )}

      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        {alertSucessMessage ? (
          <Alert onClose={handleAlertClose} severity="success">
            {alertSucessMessage}
          </Alert>
        ) : (
          <Alert onClose={handleAlertClose} severity="error">
            {alertErrorMessage}
          </Alert>
        )}
      </Snackbar>
    </AuthFormLayout>
  );
};
