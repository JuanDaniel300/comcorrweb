import { TIMER_CACHE } from "@/constants/timer";
import axiosInstance from "../api";
import cache from "memory-cache";

export const getLineasProduct = async (lineaId: string, page: string) => {
  try {
    const cacheKey = `lineas_product_${lineaId}_${page}`;
    let product = cache.get(cacheKey);

    if (!product) {
      const response = await axiosInstance.get(
        `/lineas/${lineaId}?page=${page}`
      );
      product = response?.data;

      cache.put(cacheKey, product, TIMER_CACHE);
    }

    return product;
  } catch (error) {
    console.error("Error fetching lineas product:", error);
    throw error;
  }
};
