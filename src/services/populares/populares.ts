import { TIMER_CACHE } from "@/constants/timer";
import axiosInstance from "../api";
import cache from "memory-cache";

export const getPopulares = async () => {
  try {
    let populares = cache.get("populares");

    if (!populares) {
      const response = await axiosInstance.get("/populares");
      populares = response?.data;

      cache.put("populares", populares, TIMER_CACHE);
    }

    return populares;
  } catch (error) {
    console.error("Error fetching populares:", error);
    throw error;
  }
};
