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
import { login as loginService } from "../services/authService";

interface AuthContextData {
  token: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextData>({
  token: null,
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

  async function signIn(email: string, password: string) {
    try {
      const receivedToken = await loginService(email, password);
      setToken(receivedToken);
      localStorage.setItem("token", receivedToken);
      console.log("Token recebido:", receivedToken);
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
    <AuthContext.Provider value={{ token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
