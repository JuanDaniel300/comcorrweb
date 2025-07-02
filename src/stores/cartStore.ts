import { getCart } from "@/services/cart/cart";
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
  getTotalDiscount: () => number;
  getSubtotalItem: () => number;
  getTotalItem: () => number;
  syncCartFromServer: () => Promise<void>;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      // Agrega al carrito o aumenta cantidad si ya existe
      addToCart: (product, quantity = 1) => {
        if (quantity <= 0) return; // evitar cantidades inválidas

        const cart = get().cart;
        const index = cart.findIndex((item) => item.id === product.id);

        if (index !== -1) {
          const updatedCart = [...cart];
          updatedCart[index].quantity += quantity;
          set({ cart: updatedCart });
        } else {
          set({ cart: [...cart, { ...product, quantity }] });
        }
      },

      // Elimina producto del carrito
      removeFromCart: (id) => {
        set({
          cart: get().cart.filter((item) => item.id !== id),
        });
      },

      // Limpia todo el carrito
      clearCart: () => {
        set({ cart: [] });
      },

      // Actualiza cantidad, elimina si es <= 0
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(id);
          return;
        }

        const updatedCart = get().cart.map((item) =>
          item.id === id ? { ...item, quantity } : item
        );
        set({ cart: updatedCart });
      },

      // Total de unidades (cantidad total de ítems)
      getTotalItems: () => {
        return get().cart.reduce((sum, item) => sum + item.quantity, 0);
      },

      // Total calculando el monto en base al precio promocion y original para obtener el descuento general
      getTotalDiscount: () => {
        return get().cart.reduce((sum, item) => {
          const precio1 = parseFloat(item.precio1.toString());
          const precio2 = parseFloat(item.precio2.toString());
          const cantidad = item.quantity ?? 0;

          // Verificar que ambos precios sean válidos y que haya un descuento real
          if (!isNaN(precio1) && !isNaN(precio2) && precio1 < precio2) {
            return sum + (precio1 - precio2) * cantidad;
          }

          return sum;
        }, 0);
      },
      // Subtotal en base al precio sin promocion
      getSubtotalItem: () => {
        return get().cart.reduce((sum, item) => {
          const precio1 = parseFloat(item.precio1.toString()) || 0;
          const precio2 = parseFloat(item.precio2.toString()) || 0;
          const precioFinal = precio2 > 0 ? precio2 : precio1;

          const cantidad = item.quantity ?? 0;

          return sum + precioFinal * cantidad;
        }, 0);
      },

      // Total en base al precio 1
      getTotalItem: () => {
        return get().cart.reduce(
          (sum, item) => sum + item.precio1 * item.quantity,
          0
        );
      },

      // Sincronizar el carrito de la base de datos con el local
      syncCartFromServer: async () => {
        try {
          const serverCart = await getCart();
          if (serverCart?.articulos) {
            set({ cart: serverCart.articulos });
          }
        } catch (error) {
          console.error("Error al sincronizar carrito desde servidor", error);
        }
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ cart: state.cart }), // solo persiste el carrito
    }
  )
);
