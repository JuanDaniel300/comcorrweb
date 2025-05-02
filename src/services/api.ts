import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { loginRequest } from "./auth/authService";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // URL de tu backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar el token a cada solicitud de Axios
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      // Obtener el token del servidor
      const token = await loginRequest();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    } catch (error) {
      console.error("Error al obtener el token:", error);
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores y renovar el token si es necesario
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Si el token ha caducado, intentar renovarlo
      console.log("Token caducado, intentando renovar...");

      try {
        const token = await loginRequest();
        error.config.headers.Authorization = `Bearer ${token}`;
        return axiosInstance(error.config); // Reintentar la solicitud
      } catch (err) {
        console.error("No se pudo renovar el token.");
        return Promise.reject(err);
      }
    }
    return Promise.reject(error.response?.data || error);
  }
);

export default axiosInstance;
