import axiosInstance from "@/services/api";

export const getCategorias = async () => {
  try {
    const response = await axiosInstance.get("/categorias");

    console.log(response);

    return response.data;
  } catch (error) {
    console.error("Error fetching categorias", error);
    throw error;
  }
};
