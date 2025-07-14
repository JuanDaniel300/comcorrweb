"use client";
import Breadcrumbs from "@/components/Breadcrumbs/breadCrumbs";
import Button from "@/components/Button/Button";
import OrderDetail from "@/components/cart/orderDetail.component";
import AddressSelector from "@/components/shopping-cart/addressSelector";
import { obtenerFechaEntregaEstimada } from "@/utils/generic";
import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";

export default function Shipping() {
  const router = useRouter();
  const handlerContinueShipping = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // Navigate to the shipping page
    router.push("/Shopping-cart/envio/pago");
  };

  return (
    <div className="min-h-screen padding-top ">
      <div className="container mx-auto sm:px-20 py-10">
        <div className="min-h-[450px] sm:flex gap-10 mb-20">
          <div className="h-full w-full sm:w-[60%]  px-5 rounded-xl">
            {/* Breadcrums */}
            <div className="w-full mb-10">
              <Breadcrumbs Breadcrumbs={[{ title: "Carrito", link: "#" }]} />
            </div>

            {/* title */}
            <div className="w-full mb-9">
              <span className="text-primario text-2xl font-semibold">
                Dinos a Dónde Enviar Tu Pedido
              </span>
            </div>

            {/* Fecha de entrega estimada */}
            <div className="w-full mb-8">
              <span>
                Fecha de entrega estimada: {obtenerFechaEntregaEstimada()}
              </span>
            </div>

            {/* Form */}
            <div className="w-full">
              <div>
                <AddressSelector />
              </div>

              {/* buttons */}
              <div className="w-full flex justify-between gap-20 sm:gap-0 mt-10">
                <Link
                  href="/Shopping-cart"
                  className="w-[50%] text-center text-secundario cursor-pointer py-3"
                >
                  Volver
                </Link>
                <Button
                  onClick={handlerContinueShipping}
                  title="Continuar con el pago"
                  className="w-[50%] py-3"
                />
              </div>
            </div>
          </div>

          <div className="h-full w-full sm:w-[40%] bg-white border border-gray-200 p-5 rounded-xl hidden sm:block">
            <OrderDetail showRecommended={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
