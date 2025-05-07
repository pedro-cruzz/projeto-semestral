// src/services/authService.ts
// import api from "./api";

// // interface LoginResponse {
// //   access_token: string;
// // }

// export async function login(email: string, password: string): Promise<string> {
//   const response = await api.post("/api/auth/login", { email, password });
//   // Considerando que a resposta tem a seguinte estrutura:
//   // { status: 200, message: "...", data: { access_token: "..." } }
//   const token = response.data.data.access_token;
//   return token;
// }

// src/services/authService.ts
import api from "./api";

interface User {
  id: string;
  email: string;
  password: string;
}

/**
 * Simula o endpoint de login.
 * Busca no db.json um usuário com as credenciais fornecidas.
 * Se encontrar, retorna um token simulado (nesse caso, o próprio id ou uma string fixa).
 */
export async function login(email: string, password: string): Promise<string> {
  const response = await api.get<User[]>(`/users`, {
    params: { email, password },
  });

  if (response.data.length > 0) {
    return response.data[0].id; // Retorna apenas o ID como token
  }
  throw new Error("Credenciais inválidas");
}
