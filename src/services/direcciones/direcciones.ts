import { TIMER_CACHE } from "@/constants/timer";
import axiosInstance from "../api";
import cache from "memory-cache";

type DireccionType = {
  calle: string;
  numero: string;
  colonia: string;
  ciudad: string;
  estado: string;
  codigo_postal: string;
  referencias: string;
  latitud: number;
  longitud: number;
  predeterminado: boolean;
};

export const createDirection = async (direccion: DireccionType) => {
  try {
    const response = await axiosInstance.post("/cart/direccion", direccion);

    const data = response?.data;

    return data;
  } catch (error) {
    console.error("Error al agregar una direccion");
    return null;
  }
};
