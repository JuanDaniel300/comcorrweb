import { TIMER_CACHE } from "@/constants/timer";
import axiosInstance from "../api";
import cache from "memory-cache";

export const getCart = async () => {
  try {
    const r = await axiosInstance.get("/cart");

    return r.data;
  } catch (error) {
    console.error("Error fetching getCart:", error);
  }
};

export const addProductToCart = async (
  productoId: string,
  cantidad: number
) => {
  try {
    const r = await axiosInstance.post("/cart/agregar", {
      productoId,
      cantidad,
    });

    return r.data;
  } catch (error) {
    console.error("Error fetching addProductToCart:", error);
  }
};

export const updateProductToCart = async (
  productoId: string,
  cantidad: number
) => {
  try {
    const r = await axiosInstance.put("/cart/actualizar", {
      productoId,
      cantidad,
    });

    return r.data;
  } catch (error) {
    console.error("Error fetching updateProductToCart:", error);
  }
};

export const deleteProductToCart = async (productoId: string) => {
  try {
    const r = await axiosInstance.delete(`/eliminar/${productoId}`);
    return r.data;
  } catch (error) {
    console.error("Error fetching deleteProductToCart:", error);
  }
};

export const clearCart = async () => {
  try {
    const r = await axiosInstance.delete("/vaciar");

    return r.data;
  } catch (error) {
    console.error("Error fetching deleteCart:", error);
  }
};
