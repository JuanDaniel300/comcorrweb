// src/handlers/cartHandlers.ts
import { useCartStore } from "@/stores/cartStore";
import { Product } from "@/types/product.type";

// Handler para agregar
export const handleAddToCart = (product: Product, quantity = 1) => {
  useCartStore.getState().addToCart(product, quantity);
};

// Handler para eliminar
export const handleRemoveFromCart = (clave: string) => {
  useCartStore.getState().removeFromCart(clave);
};

// Handler para vaciar carrito
export const handleClearCart = () => {
  useCartStore.getState().clearCart();
};

// Handler para aumentar cantidad
export const handleIncreaseQuantity = (clave: string) => {
  const item = useCartStore.getState().cart.find((i) => i.clave === clave);
  if (item) {
    useCartStore.getState().updateQuantity(clave, item.quantity + 1);
  }
};

// Handler para disminuir cantidad
export const handleDecreaseQuantity = (clave: string) => {
  const item = useCartStore.getState().cart.find((i) => i.clave === clave);
  if (item) {
    const newQuantity = item.quantity - 1;
    useCartStore.getState().updateQuantity(clave, newQuantity);
  }
};
