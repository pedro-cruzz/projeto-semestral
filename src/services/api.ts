// // src/api.ts
// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:8080", // ajuste para sua URL/porta
// });

// // Interceptador que adiciona o token a todas as requisições
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token && config.headers) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default api;

// src/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001", // ou outra porta em que o json-server esteja rodando
});

// Opcional: se quiser simular a utilização do token em requisições protegidas
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
