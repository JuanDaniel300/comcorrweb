import { authOptionsUtils } from "@/lib/session";
import axios from "axios";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

const isClient = typeof window !== "undefined";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Agregar token al header Authorization de cada solicitud
axiosInstance.interceptors.request.use(async (config) => {
  const session = isClient
    ? await getSession()
    : await getServerSession(authOptionsUtils);

  if (session?.accessToken) {
    // Si hay un token de sesión, lo agregamos al header Authorization
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  } else {
    config.headers.Authorization = `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si el token expiró (401), intentamos renovarlo
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.status === 403 &&
      !originalRequest._retry
    ) {
      // Realizar el logout llamando al Route Handler
      await axios.post(`${process.env.NEXTAUTH_URL}/api/auth/logout`);

      // Redirigir al usuario a la página principal
      // redirect("/");
      // window.location.href = "/";

      // Retornar un error para evitar que se propague
      return Promise.reject(error);
    }

    // Cualquier otro error
    return Promise.reject(error.response?.data || error);
  }
);

export default axiosInstance;
