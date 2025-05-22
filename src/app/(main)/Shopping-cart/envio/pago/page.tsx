"use client";

import { BiStore } from "react-icons/bi";
import { CiCreditCard1, CiMoneyBill } from "react-icons/ci";

import { TbBrandPaypal } from "react-icons/tb";
import { RiArrowLeftLine } from "react-icons/ri";
import { useRouter } from "nextjs-toploader/app";
import Breadcrumbs from "@/components/Breadcrumbs/breadCrumbs";
import Button from "@/components/Button/Button";
import Link from "next/link";
import OrderDetail from "@/components/cart/orderDetail.component";

export const Payment = () => {
  const router = useRouter();
  const handlerCompleteOrder = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    router.push("/Shopping-cart/envio/pago/confirmacion");
  };
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

            {/* title */}
            <div className="w-full mb-7">
              <span className="text-primario text-2xl font-semibold">
                Selecciona Tu Método de Pago
              </span>
            </div>

            {/* Tarjeta */}
            <div className="w-full mb-9">
              <span className="text-primario text-xl font-[500]">
                Introduce tu tarjeta
              </span>
              <div className="bg-gray-300 h-[100px] w-[250px] rounded-xl mt-5">
                <span className="text-white mx-auto flex justify-center align-center self-center h-full items-center">
                  -
                  <br />-
                </span>
              </div>
            </div>

            {/* Formulario de tarjeta */}
            <div className="w-full">
              <form className="w-full">
                {/* numero y nombre de la tarjeta */}
                <div className="flex gap-4 mb-8">
                  <div className="w-full relative">
                    <label htmlFor="" className="font-[500]">
                      Número de Tarjeta
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="p-2 text-sm w-full border border-gray-300 rounded-lg"
                    ></input>
                    <CiCreditCard1
                      size={30}
                      color="#5c5c5c"
                      className="absolute  bottom-[6px] right-[10px]"
                    />
                  </div>
                  <div className="w-full">
                    <label htmlFor="" className="font-[500]">
                      Nombre en la Tarjeta
                    </label>
                    <input
                      type="text"
                      placeholder="Nombre (s) Apellidos"
                      className="w-full p-2 text-sm border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                {/* Calle numero y CodigoPostal */}
                <div className="flex gap-4 mb-8">
                  <div className="w-full">
                    <label htmlFor="" className="font-[500]">
                      Fecha de Expiración
                    </label>
                    <input
                      type="text"
                      placeholder="MM/AA"
                      className="w-full p-2 text-sm border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div className="w-full ">
                    <label htmlFor="" className="font-[500]">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full p-2 text-sm border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </form>
            </div>

            {/* Otros metodos de pago */}
            <div className="w-full">
              <span className="text-primario text-xl font-[500]">
                Usar otros métodos de pago
              </span>
              <div className="w-[50%] space-y-3 mt-6">
                <Button
                  icon={<BiStore size={20} />}
                  className=" rounded-lg"
                  title="Tiendas de Conveniencia"
                  variants="outlineGrey"
                />
                <Button
                  icon={<TbBrandPaypal size={20} />}
                  className=" rounded-lg"
                  title="Pagos mediante Paypal"
                  variants="outlineGrey"
                />
                <Button
                  icon={<CiMoneyBill size={20} />}
                  className=" rounded-lg"
                  title="Transferencias Bancaria"
                  variants="outlineGrey"
                />
              </div>
            </div>

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

          <div className="h-full w-[40%] bg-white border border-gray-200 p-5 rounded-xl">
            <OrderDetail showRecommended={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
