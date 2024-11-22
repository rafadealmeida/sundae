import { auth } from "@/app/api/auth/[...nextauth]/auth";
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.LIFERAY_URL,
});

api.interceptors.request.use(
  async (config) => {
    const session = await auth();

    if (session && session.accessToken) {
      // Adiciona o token ao cabeçalho Authorization
      config.headers["Authorization"] = `Bearer ${session.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
