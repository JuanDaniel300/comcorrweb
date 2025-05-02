import axiosInstance from "../api";

export const getBanners = async () => {
  try {
    const response = await axiosInstance.get("/banner");

    return response.data;
  } catch (error) {
    console.error("Error fetching banner:", error);
    throw error;
  }
};
