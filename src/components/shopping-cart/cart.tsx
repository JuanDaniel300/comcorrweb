"use client";

import { AiOutlineShoppingCart } from "react-icons/ai";
import Button from "../Button/Button";
import { BiPackage } from "react-icons/bi";
import ListShoppingCart from "../cart/listShoppingCart.component";
import { useCartStore } from "@/stores/cartStore";
import { Fragment, useEffect, useState } from "react";
import EmptyCart from "./emptyCart";
import { formatCurrency, obtenerFechaEntregaEstimada } from "@/utils/generic";
import { FiTrash2 } from "react-icons/fi";
import { handleClearCart } from "@/handlers/cartHandlers";
import { useRouter } from "nextjs-toploader/app";

export default function CartView() {
  const {
    cart,
    getTotalDiscount,
    getTotalItems,
    getSubtotalItem,
    getTotalItem,
    syncCartFromServer,
  } = useCartStore();
  const [totalItems, setTotalItems] = useState<number>(0);
  const [subtotal, setSubTotal] = useState<number>(0);
  const [descuento, setDescuento] = useState<number>(0);
  const [envio, setEnvio] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    setTotalItems(getTotalItems());
    setSubTotal(getSubtotalItem());
    setDescuento(getTotalDiscount());
    setEnvio(0);
    setTotal(getTotalItem() + envio);
  }, [cart]);

  return !cart || !Array.isArray(cart) || cart.length <= 0 ? (
    <EmptyCart />
  ) : (
    <ShoppingCart
      cart={cart}
      subtotal={subtotal}
      descuento={descuento}
      envio={envio}
      total={total}
    />
  );
}

const ShoppingCart = ({
  cart,
  subtotal,
  descuento,
  envio,
  total,
}: {
  cart: any;
  subtotal: number;
  descuento: number;
  envio: number;
  total: number;
}) => {
  const router = useRouter();
  const handlerProcederCompra = () => {
    router.push("/Shopping-cart/envio");
  };
  return (
    <div className="min-h-[450px] flex gap-10 mb-20">
      <div className="h-full w-[70%] bg-white border border-gray-200 p-5 rounded-xl">
        <div className="text-2xl text-primario font-semibold">Carrito</div>

        <div className="w-full my-2">
          <ListShoppingCart products={cart} />
        </div>
      </div>
      <div className="h-full w-[30%] bg-white border border-gray-200 p-5 rounded-xl sticky top-[150px]">
        <div className="border-b-2 border-gray-100 pb-5">
          {/* Resumen de pedido, fecha de envio */}
          <div className="text-xl  font-[500]">Resumen del Pedido</div>
          <div className=" font-[600] my-3">Entrega</div>
          <div className="text-sm text-oscuro2">
            Fecha de entrega estimada: {obtenerFechaEntregaEstimada()}
          </div>
        </div>

        {/* Subtotal, Descuento, Envio */}
        <div className="border-b-2 border-gray-100 pt-5 pb-0">
          <div className="flex space-y-4 justify-between m-auto">
            <div className="text-oscuro2 text-sm">Subtotal</div>
            <div className="text-oscuro2 text-base">
              {formatCurrency(subtotal)}
            </div>
          </div>
          <div className="flex space-y-4 justify-between m-auto">
            <div className="text-oscuro2 text-sm">Descuento</div>
            <div className="text-oscuro2 text-base">
              {" "}
              {formatCurrency(descuento)}
            </div>
          </div>
          <div className="flex space-y-4 justify-between m-auto">
            <div className="text-oscuro2 text-sm">Envio</div>
            <div className="text-oscuro2 text-base">
              {formatCurrency(envio)}
            </div>
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between m-auto py-3">
          <div className="font-semibold text-lg">Total</div>
          <div className="text-secundario font-semibold text-xl">
            {formatCurrency(total)}
          </div>
        </div>

        {/* Buttons */}
        <div className="w-full space-y-4">
          <Button
            onClick={handlerProcederCompra}
            title="Proceder a la compra"
            variants="primary"
            className="font-[500]"
            icon={<AiOutlineShoppingCart size={25} />}
          />

          <Button
            title="Continuar comprando"
            variants="outline"
            className="font-[500]"
            icon={<BiPackage size={25} />}
          />

          <Button
            onClick={handleClearCart}
            title="Limpiar Carrito"
            variants="outline"
            className="font-[500]"
            icon={<FiTrash2 size={20} />}
          />
        </div>
      </div>
    </div>
  );
};
