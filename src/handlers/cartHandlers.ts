import {
  addProductToCart,
  clearCart,
  deleteProductToCart,
  updateProductToCart,
} from "@/services/cart/cart";
import { useCartStore } from "@/stores/cartStore";
import { Product } from "@/types/product.type";

export const handleAddToCart = async (
  product: Product,
  quantity = 1,
  cartCallback?: (item: any) => void
) => {
  try {
    const result = await addProductToCart(product.id, quantity);

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

      console.log({ result });

      if (result) {
        console.log("si entro para actualizar la cantidad en el carrito local");
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
