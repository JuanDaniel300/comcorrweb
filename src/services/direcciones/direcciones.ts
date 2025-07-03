import axiosInstance from "../api";

export type DireccionType = {
  id?: number;
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

export const getDirecciones = async () => {
  try {
    const response = await axiosInstance.get("/cart/direccion");
    const data = response?.data;
    return data;
  } catch (error) {
    console.error("Error al obtener direcciones");
    return null;
  }
};
