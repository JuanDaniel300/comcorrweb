import axiosInstance from "../api";

export const getPopulares = async () => {
  try {
    const response = await axiosInstance.get("/populares");
    return response.data;
  } catch (error) {
    console.error("Error fetching populares:", error);
    throw error;
  }
};
