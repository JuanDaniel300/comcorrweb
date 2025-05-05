// http://18.191.238.226:3000/api/marcas --> banner de marcas

import axiosInstance from "../api";

export const getMarcas = async () => {
  try {
    const response = await axiosInstance.get("/marcas");
    return response.data;
  } catch (error) {
    console.error("Error fetching marcas:", error);
    throw error;
  }
};
