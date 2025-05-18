import { TIMER_CACHE } from "@/constants/timer";
import axiosInstance from "../api";
import cache from "memory-cache";

export const getArticulosBySearch = async (q: string, page: number = 1) => {
  try {
    const cacheKey = `articulos_${q}_${page}`;
    let articulo = cache.get(cacheKey);

    if (!articulo) {
      const response = await axiosInstance.get(`/articulos?search=${q}&page=${page}`);
      articulo = response?.data;

      cache.put(cacheKey, articulo, TIMER_CACHE);
    }

    console.log("Articulos fetched:", articulo?.articulos.length, "for query:", q, "on page:", page);

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