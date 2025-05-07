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

interface AuthContextData {
  token: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  userId: string | null;
}

export const AuthContext = createContext<AuthContextData>({
  token: null,
  signIn: async () => {},
  signOut: () => {},
  userId: null,
});

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  token: string | null;
  userId: string | null; // Adicione isso
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

// No provider:
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [userId, setUserId] = useState<string | null>(
    localStorage.getItem("userId")
  ); // Novo estado

  async function signIn(email: string, password: string) {
    try {
      const response = await api.get<User[]>(`/users`, {
        params: { email, password },
      });

      if (response.data.length === 0) throw new Error("Credenciais inválidas");

      const user = response.data[0];
      setToken(user.id); // Armazena o ID como token
      setUserId(user.id); // Armazena o ID do usuário
      localStorage.setItem("token", user.id);
      localStorage.setItem("userId", user.id);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    }
  }

  function signOut() {
    setToken(null);
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider value={{ token, signIn, signOut, userId }}>
      {children}
    </AuthContext.Provider>
  );
};
