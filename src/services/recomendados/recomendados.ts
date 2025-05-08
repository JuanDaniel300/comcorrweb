import { TIMER_CACHE } from "@/constants/timer";
import axiosInstance from "../api";
import cache from "memory-cache";

export const getRecomendados = async () => {
  try {
    let recomendados = cache.get("recomendados");

    if (!recomendados) {
      const response = await axiosInstance.get("/recomendados");
      recomendados = response.data;

      cache.put("recomendados", recomendados, TIMER_CACHE);
    }

    return recomendados;
  } catch (error) {
    console.error("Error fetching recomendados:", error);
    throw error;
  }
};
