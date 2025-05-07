import axiosInstance from "../api";

export const getRecomendados = async () => {
  try {
    const response = await axiosInstance.get("/recomendados");

    return response.data;
  } catch (error) {
    console.error("Error fetching populares:", error);
    throw error;
  }
};
