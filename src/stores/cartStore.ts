import { Product } from "@/types/product.type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = Product & {
  quantity: number;
};

type CartStore = {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (clave: string) => void;
  clearCart: () => void;
  updateQuantity: (clave: string, quantity: number) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],

      // Agrega al carrito o aumenta cantidad si ya existe
      addToCart: (product, quantity = 1) => {
        if (quantity <= 0) return; // evitar cantidades inválidas

        const cart = get().cart;
        const index = cart.findIndex((item) => item.clave === product.clave);

        if (index !== -1) {
          const updatedCart = [...cart];
          updatedCart[index].quantity += quantity;
          set({ cart: updatedCart });
        } else {
          set({ cart: [...cart, { ...product, quantity }] });
        }
      },

      // Elimina producto del carrito
      removeFromCart: (clave) => {
        set({ cart: get().cart.filter((item) => item.clave !== clave) });
      },

      // Limpia todo el carrito
      clearCart: () => {
        set({ cart: [] });
      },

      // Actualiza cantidad, elimina si es <= 0
      updateQuantity: (clave, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(clave);
          return;
        }

        const updatedCart = get().cart.map((item) =>
          item.clave === clave ? { ...item, quantity } : item
        );
        set({ cart: updatedCart });
      },

      // Total de unidades (cantidad total de ítems)
      getTotalItems: () => {
        return get().cart.reduce((sum, item) => sum + item.quantity, 0);
      },

      // Total en precio
      getTotalPrice: () => {
        return get().cart.reduce(
          (sum, item) => sum + item.precio1 * item.quantity,
          0
        );
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ cart: state.cart }), // solo persiste el carrito
    }
  )
);
