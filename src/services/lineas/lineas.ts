import { TIMER_CACHE } from "@/constants/timer";
import axiosInstance from "../api";
import cache from "memory-cache";

export const getLineasProduct = async (lineaId: string) => {
  try {
    const cacheKey = `lineas_product_${lineaId}`;
    let product = cache.get(cacheKey);

    if (!product) {
      const response = await axiosInstance.get(`/lineas/${lineaId}`);
      product = response?.data;

      cache.put(cacheKey, product, TIMER_CACHE);
    }

    return product;
  } catch (error) {
    console.error("Error fetching lineas product:", error);
    throw error;
  }
};
