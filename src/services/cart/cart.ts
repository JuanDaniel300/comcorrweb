import { TIMER_CACHE } from "@/constants/timer";
import axiosInstance from "../api";
import cache from "memory-cache";

export const getCart = async () => {
  try {
    const r = await axiosInstance.get("/cart");

    return r.data;
  } catch (error) {
    console.error("Error fetching getCart:", error);
    return false;
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
    return false;
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
    return false;
  }
};

export const deleteProductToCart = async (productoId: string) => {
  try {
    const r = await axiosInstance.delete(`/cart/eliminar/${productoId}`);
    return r.data;
  } catch (error) {
    console.error("Error fetching deleteProductToCart:", error);
    return false;
  }
};

export const clearCart = async () => {
  try {
    const r = await axiosInstance.delete("/cart/vaciar");

    return r.data;
  } catch (error) {
    console.error("Error fetching deleteCart:", error);
    return false;
  }
};
