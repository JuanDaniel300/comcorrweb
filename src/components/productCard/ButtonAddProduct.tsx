"use client";
import { Product } from "@/types/product.type";
import Button from "../Button/Button";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useToast } from "@/providers/ToastProviderClient";
import { handleAddToCart } from "@/handlers/cartHandlers";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export default function ButtonAddProduct({
  product,
}: {
  product: Product;
  quantity: 1;
}) {
  const { cart } = useToast();
  const { data: session } = useSession();
  const handlerClickAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session) {
      toast.error("Debes iniciar sesión para agregar productos a tu carrito.");
      return;
    }


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
