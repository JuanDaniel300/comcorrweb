"use client;";
import { SlArrowRight } from "react-icons/sl";
import ListShoppingShipping from "./listShoppingShipping.component";
import { motion } from "framer-motion";
import ListItemRecomended from "./listItemsRecomended.component";
import { useCartStore } from "@/stores/cartStore";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/utils/generic";

const OrderDetail = ({
  showRecommended = true,
}: {
  showRecommended: boolean;
}) => {
  const {
    cart,
    getSubtotalItem,
    getTotalDiscount,
    getTotalItem,
    getTotalItems,
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
  }, []);

  return (
    <div>
      <div className="text-xl  font-semibold">Tu Pedido</div>

      {/* Products */}
      <div className="products w-full my-5">
        <ListShoppingShipping products={cart} />
      </div>

      {/* Divider */}

      {/* Codigo de descuento */}
      {showRecommended && (
        <>
          <hr className="border border-gray-100" />
          <div className="w-full mb-5">
            <div className="w-full mt-5 flex gap-4">
              <input
                type="text"
                placeholder="Código de descuento"
                className="w-full p-2 border border-gray-300 rounded-lg text-sm"
              />
              <motion.button
                whileHover={{
                  background: "var(--degradadoPrimario)",
                }}
                className="bg-primario px-3 py-3 rounded-full cursor-pointer"
              >
                <SlArrowRight color="white" />
              </motion.button>
            </div>
          </div>
        </>
      )}

      {/* Divider */}
      <hr className="border border-gray-100" />

      {/* Subtotal, envio  */}
      <div className="w-full">
        <div className="border-b-2 border-gray-100 pt-5 pb-0 ">
          <div className="flex space-y-3 justify-between m-auto">
            <div className="text-oscuro2 text-sm">Subtotal</div>
            <div className="text-oscuro2 text-sm font-semibold">
              {formatCurrency(subtotal)}
            </div>
          </div>
          <div className="flex space-y-3 justify-between m-auto">
            <div className="text-oscuro2 text-sm">Envio</div>
            <div className="text-oscuro2 text-sm font-semibold">
              {formatCurrency(envio)}
            </div>
          </div>
        </div>

        <div className="my-4 mb-2 border-gray-100">
          <div className="flex space-y-3 justify-between m-auto">
            <div className="text-oscuro2  font-[500]">Total</div>
            <div className="text-secundario font-semibold text-base ">
              {formatCurrency(total)}
            </div>
          </div>
        </div>
      </div>

      {/* Productos recomnedados */}
      {showRecommended && (
        <div className="w-full border-t-2 border-gray-100">
          <div className="text-lg  font-semibold mt-5">
            También podria interesarte
          </div>
          <div className="w-full mt-5">
            <ListItemRecomended products={[]} />
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetail;
