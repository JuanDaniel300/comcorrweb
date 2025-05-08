import { TIMER_CACHE } from "@/constants/timer";
import axiosInstance from "@/services/api";
import cache from "memory-cache";

export const getCategorias = async () => {
  try {
    let categorias = cache.get("categorias");

    if (!categorias) {
      const response = await axiosInstance.get("/categorias");
      categorias = response?.data;

      cache.put("categorias", categorias, TIMER_CACHE);
    }

    return categorias;
  } catch (error) {
    console.error("Error fetching categorias", error);
    throw error;
  }
};
