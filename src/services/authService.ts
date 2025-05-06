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

  if (response.data && response.data.length > 0) {
    // Usuário encontrado – aqui você pode simular o token.
    // Por exemplo, usando o id ou gerando uma string (pode ser até um base64 do email)
    const user = response.data[0];
    const token = btoa(user.id + ":" + user.email); // token simulado
    return token;
  } else {
    throw new Error("Credenciais inválidas");
  }
}
