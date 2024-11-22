// import { auth } from "@/app/api/auth/[...nextauth]/auth";
import axios from "axios";

export const api = axios.create({
  baseURL: "https://sescportalhml.seatecnologia.com.br",
  headers: {
    "Accept-Language": "pt-BR,pt;q=0.9",
    "Content-Type": "application/json",
  },
});

// api.interceptors.request.use(
//   async (config) => {
//     const session = await auth();

//     if (session && session.accessToken) {
//       // Adiciona o token ao cabeçalho Authorization
//       config.headers["Authorization"] = `Bearer ${session.accessToken}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
