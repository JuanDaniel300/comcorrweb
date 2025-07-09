// services/auth/register.ts

import axiosInstance from "../api";

export interface RegisterPayload {
  nombre: string;
  email: string;
  password: string;
  direccion: string;
  phone: string;
}

export const registerUser = async (userData: RegisterPayload) => {
  try {
    const response = await axiosInstance.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    throw error;
  }
};
