"use client";
import { Product } from "@/types/product.type";
import Button from "../Button/Button";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useToast } from "@/providers/ToastProviderClient";
import { handleAddToCart } from "@/handlers/cartHandlers";

export default function ButtonAddProduct({
  product,
}: {
  product: Product;
  quantity: 1;
}) {
  const { cart } = useToast();

  const handlerClickAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Lógica para añadir al carrito
    handleAddToCart(product, 1, cart);
  };

  return (
    <Button
      onClick={handlerClickAddToCart}
      variants="primary"
      title="Añadir al carrito"
      icon={<AiOutlineShoppingCart color="white" size={25} />}
    />
  );
}
