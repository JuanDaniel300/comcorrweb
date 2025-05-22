"use client";
// src/handlers/cartHandlers.ts
import {
  addProductToCart,
  clearCart,
  deleteProductToCart,
  updateProductToCart,
} from "@/services/cart/cart";
import { useCartStore } from "@/stores/cartStore";
import { Product } from "@/types/product.type";

// Handler para agregar
export const handleAddToCart = async (
  product: Product,
  quantity = 1,
  cart?: any
) => {
  try {
    const result = await addProductToCart(product.clave, quantity);

    if (result) {
      useCartStore.getState().addToCart(product, quantity);

      cart({
        id: product.id,
        name: product?.descripcion,
        brand: product?.marca,
        price: product?.precio1,
        image: product?.imagen1 || "/products/refrigerador.png",
        quantity: quantity,
      });
    }
  } catch (error) {
    console.error("no se pudo agregar el prodcuto", product.clave);
  }
};

// Handler para eliminar
export const handleRemoveFromCart = async (clave: string) => {
  try {
    const result = await deleteProductToCart(clave);

    if (result) {
      useCartStore.getState().removeFromCart(clave);
    }
  } catch (error) {
    console.error("No se pudo eliminar el producto del carro");
  }
};

// Handler para vaciar carrito
export const handleClearCart = async () => {
  try {
    const result = await clearCart();

    if (result) {
      useCartStore.getState().clearCart();
    }
  } catch (error) {
    console.error("No se pudo limpiar el carrito");
  }
};

// Handler para aumentar cantidad
export const handleIncreaseQuantity = async (clave: string) => {
  try {
    const item = useCartStore.getState().cart.find((i) => i.clave === clave);
    if (item) {
      const result = await updateProductToCart(
        item.id || item.clave,
        item.quantity + 1
      );

      if (result) {
        useCartStore.getState().updateQuantity(clave, item.quantity + 1);
      }
    }
  } catch (error) {
    console.error("No se pudo actualizar la cantidad");
  }
};

// Handler para disminuir cantidad
export const handleDecreaseQuantity = async (clave: string) => {
  try {
    const item = useCartStore.getState().cart.find((i) => i.clave === clave);
    if (item) {
      const newQuantity = item.quantity - 1;

      const result = await updateProductToCart(
        item.id || item.clave,
        newQuantity
      );

      if (result) {
        useCartStore.getState().updateQuantity(clave, newQuantity);
      }
    }
  } catch (error) {
    console.error("No se pudo actualizar la cantidad");
  }
};
