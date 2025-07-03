"use client";

import { RiArrowLeftLine } from "react-icons/ri";
import { useRouter } from "nextjs-toploader/app";
import Breadcrumbs from "@/components/Breadcrumbs/breadCrumbs";
import Button from "@/components/Button/Button";
import Link from "next/link";
import OrderDetail from "@/components/cart/orderDetail.component";
import { useAddressStore as useAddressStore } from "@/stores/adressStore";
import { useEffect, useState } from "react";
import CheckoutNetPay from "@/components/shopping-cart/netpay";
import { createOrder } from "@/services/checkout/checkout";
import toast from "react-hot-toast";

export const Payment = () => {
  const router = useRouter();
  const { selectedAddress } = useAddressStore();

  const [loading, setLoading] = useState(false);

  const handlerCompleteOrder = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (loading) return; // Evita múltiples clics

    try {
      setLoading(true);

      if (!selectedAddress) {
        toast.error("Debes seleccionar una dirección para continuar.");
        setLoading(false);
        return;
      }

      const orderData = await createOrder(selectedAddress);

      if (orderData && orderData.venta_id) {
        router.push(
          `/Shopping-cart/envio/pago/confirmacion?order_id=${orderData.venta_id}`
        );
      } else {
        toast.error(
          "Ocurrió un error al generar la orden. Intenta nuevamente."
        );
      }
    } catch (error) {
      console.error("Error al completar la orden:", error);
      toast.error("Ocurrió un error inesperado. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(selectedAddress);
  }, [selectedAddress]);

  return (
    <div className="min-h-screen padding-top ">
      <div className="container mx-auto px-20 py-10">
        <div className="min-h-[450px] flex gap-10 mb-20">
          <div className="h-full w-[60%]  px-5 rounded-xl">
            {/* Breadcrums */}
            <div className="w-full mb-10">
              <Breadcrumbs
                Breadcrumbs={[
                  { title: "Carrito", link: "#" },
                  { title: "Envio", link: "" },
                ]}
              />
            </div>

            <CheckoutNetPay />

            <div>
              {/* buttons */}
              <div className="w-full flex justify-between mt-10">
                <Link
                  href="/Shopping-cart/envio"
                  className="w-[30%] text-center text-secundario cursor-pointer py-3 flex items-center"
                >
                  <RiArrowLeftLine className="me-3" size={20} />
                  Volver
                </Link>
                <Button
                  onClick={handlerCompleteOrder}
                  title="Finalizar Compra"
                  className="w-[50%] py-3"
                />
              </div>
            </div>
          </div>

          <div className="h-full w-[40%] bg-white border border-gray-200 p-5 rounded-xl">
            <OrderDetail showRecommended={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
