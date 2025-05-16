import { TIMER_CACHE } from "@/constants/timer";
import axiosInstance from "../api";
import cache from "memory-cache";

export const getPromocionales = async () => {
  try {
    let promocionales = cache.get("promocionales");

    if (!promocionales) {
      const response = await axiosInstance.get("/promos");
      promocionales = response?.data;

      cache.put("promocionales", promocionales, TIMER_CACHE);
    }

    return promocionales;
  } catch (error) {
    console.error("Error fetching promocionales:", error);
    throw error;
  }
};

export const getPromocionalesById = async (id: string) => {
  try {
    let promocionales = cache.get(`promocionales_${id}`);

    if (!promocionales) {
      const response = await axiosInstance.get(`/promos/${id}`);
      promocionales = response?.data;

      cache.put(`promocionales_${id}`, promocionales, TIMER_CACHE);
    }

    return promocionales;
  } catch (error) {
    console.error("Error fetching promocionales by id:", error);
    throw error;
  }
};
