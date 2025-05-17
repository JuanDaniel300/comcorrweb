import { TIMER_CACHE } from "@/constants/timer";
import axiosInstance from "../api";
import cache from "memory-cache";

export const getArticulosBySearch = async (q: string) => {
  try {
    const cacheKey = `articulos_${q}`;
    let articulo = cache.get(cacheKey);

    if (!articulo) {
      const response = await axiosInstance.get(`/articulos?search=${q}`);
      articulo = response?.data;

      cache.put(cacheKey, articulo, TIMER_CACHE);
    }

    return articulo;
  } catch (error) {
    console.error("Error fetching articulos:", error);
    throw error;
  }
};

export const getArticulosById = async (id: string) => {
  try {
    const cacheKey = `articulo_${id}`;
    let articulo = cache.get(cacheKey);

    if (!articulo) {
      const response = await axiosInstance.get(`/articulos/${id}`);
      articulo = response?.data;

      cache.put(cacheKey, articulo, TIMER_CACHE);
    }

    return articulo;
  } catch (error) {
    console.error("Error fetching articulo by ID:", error);
    throw error;
  }
}