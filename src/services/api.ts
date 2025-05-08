import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import axios from "axios";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Para que las cookies se envíen con las solicitudes
});

// Agregar token al header Authorization de cada solicitud
axiosInstance.interceptors.request.use(async (config) => {
  const session = await getServerSession(authOptions);

  if (session?.accessToken) {
    // Si hay un token de sesión, lo agregamos al header Authorization
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }

  return config;
});

export default axiosInstance;
