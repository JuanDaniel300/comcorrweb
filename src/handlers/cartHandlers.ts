import {
  addProductToCart,
  clearCart,
  deleteProductToCart,
  updateProductToCart,
} from "@/services/cart/cart";
import { useCartStore } from "@/stores/cartStore";
import { Product } from "@/types/product.type";
import toast from "react-hot-toast";

interface CartCallbackItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  quantity: number;
}

type CartCallback = (item: CartCallbackItem) => void;

export const handleAddToCart = async (
  product: Product,
  quantity: number = 1,
  cartCallback?: CartCallback
): Promise<void> => {
  try {
    const result: boolean = await addProductToCart(product.id, quantity);

    if (result) {
      useCartStore.getState().addToCart(product, quantity);

      if (cartCallback) {
        cartCallback({
          id: product.id,
          name: product.descripcion,
          brand: product.marca,
          price: product.precio1,
          image: product.imagen1 || "/products/refrigerador.png",
          quantity,
        });
      }

      // toast.success("Producto agregado a su carrito de compras");
    } else {
      toast.error("No se pudo agregar el producto a su carrito de compra");
    }
  } catch (error) {
    console.error("No se pudo agregar el producto", product.id, error);
  }
};

export const handleRemoveFromCart = async (id: string) => {
  try {
    const result = await deleteProductToCart(id);

    if (result) {
      useCartStore.getState().removeFromCart(id);
    } else {
      toast.error("No se pudo eliminar el producto del carrito");
    }
  } catch (error) {
    console.error("No se pudo eliminar el producto del carrito", error);
  }
};

export const handleClearCart = async () => {
  try {
    const result = await clearCart();

    if (result) {
      useCartStore.getState().clearCart();

      toast.success("Carrito limpiado correctamente");
    } else {
      toast.error("No se pudo limpiar el carrito");
    }
  } catch (error) {
    console.error("No se pudo limpiar el carrito", error);
  }
};

export const handleIncreaseQuantity = async (id: string) => {
  try {
    const item = useCartStore.getState().cart.find((i) => i.id === id);

    if (item) {
      const result = await updateProductToCart(item.id, item.quantity + 1);

      if (result) {
        useCartStore.getState().updateQuantity(id, item.quantity + 1);
      }
    }
  } catch (error) {
    console.error("No se pudo actualizar la cantidad", error);
  }
};

export const handleDecreaseQuantity = async (id: string) => {
  try {
    const item = useCartStore.getState().cart.find((i) => i.id === id);

    if (item) {
      const newQuantity = item.quantity - 1;

      const result = await updateProductToCart(item.id, newQuantity);

      if (result) {
        useCartStore.getState().updateQuantity(id, newQuantity);
      }
    }
  } catch (error) {
    console.error("No se pudo actualizar la cantidad", error);
  }
};
