// // src/contexts/AuthContext.tsx
// import React, { createContext, useState, ReactNode } from "react";
// import { login as loginService } from "../services/authService";

// interface AuthContextData {
//   token: string | null;
//   signIn: (email: string, password: string) => Promise<void>;
//   signOut: () => void;
// }

// export const AuthContext = createContext<AuthContextData>({
//   token: null,
//   signIn: async () => {},
//   signOut: () => {},
// });

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [token, setToken] = useState<string | null>(
//     localStorage.getItem("token")
//   );

//   async function signIn(email: string, password: string) {
//     try {
//       const receivedToken = await loginService(email, password);
//       setToken(receivedToken);
//       localStorage.setItem("token", receivedToken);
//     } catch (error) {
//       console.error("Erro no login:", error);
//       throw error;
//     }
//   }

//   function signOut() {
//     setToken(null);
//     localStorage.removeItem("token");
//   }

//   return (
//     <AuthContext.Provider value={{ token, signIn, signOut }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// src/contexts/AuthContext.tsx
import React, { createContext, useState, ReactNode } from "react";
import api from "../services/api";

interface User {
  id: string;
  email: string;
  password: string;
}

interface Psychologist {
  id: string;
  userId: string;
  name: string;
  crp: string;
  birthDate: string;
  activitiesStartDate: string;
  about?: string;
  specialization?: string[];
  image?: string;
  // ... outros campos do psicólogo
}

interface Patient {
  id: string;
  userId: string;
  name: string;
  birthDate: string;
  about?: string;
  image?: string;
  // ... outros campos do psicólogo
}

interface AuthContextData {
  token: string | null;
  userId: string | null;
  psychologistId: string | null; // Novo campo
  patientId: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextData>({
  token: null,
  userId: null,
  psychologistId: null,
  patientId: null,
  signIn: async () => {},
  signOut: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [userId, setUserId] = useState<string | null>(
    localStorage.getItem("userId")
  );
  const [psychologistId, setPsychologistId] = useState<string | null>(
    localStorage.getItem("psychologistId")
  );

  const [patientId, setPatientId] = useState<string | null>(
    localStorage.getItem("patientId")
  );
  async function signIn(email: string, password: string) {
    try {
      if (!email || !password) {
        throw new Error("Preencha todos os campos");
      }
      // Busca o usuário
      const userResponse = await api.get<User[]>(`/users`, {
        params: { email, password },
      });

      if (userResponse.data.length === 0) {
        throw new Error("Credenciais inválidas");
      }

      const user = userResponse.data[0];

      // Busca o psicólogo vinculado ao usuário
      const psyResponse = await api.get<Psychologist[]>(
        `/psychologists?userId=${user.id}`
      );

      const patResponse = await api.get<Patient[]>(
        `/patients?userId=${user.id}`
      );
      const patientId = patResponse.data[0]?.id || null;
      setPatientId(patientId);

      // Atualiza os estados
      setToken(user.id);
      setUserId(user.id);
      setPsychologistId(psyResponse.data[0]?.id || null);

      // Armazena no localStorage
      localStorage.setItem("token", user.id);
      localStorage.setItem("userId", user.id);
      localStorage.setItem("psychologistId", psyResponse.data[0]?.id || "");
      localStorage.setItem("patientId", patientId || "");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    }
  }

  function signOut() {
    setToken(null);
    setUserId(null);
    setPsychologistId(null);
    setPatientId(null);
    localStorage.removeItem("patientId");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("psychologistId");
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        psychologistId,
        patientId,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
