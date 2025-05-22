"use client";
import Breadcrumbs from "@/components/Breadcrumbs/breadCrumbs";
import Button from "@/components/Button/Button";
import OrderDetail from "@/components/cart/orderDetail.component";
import { obtenerFechaEntregaEstimada } from "@/utils/generic";
import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";

export const Shipping = () => {
  const router = useRouter();
  const handlerContinueShipping = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // Navigate to the shipping page
    router.push("/Shopping-cart/envio/pago");
  };

  return (
    <div className="min-h-screen padding-top ">
      <div className="container mx-auto px-20 py-10">
        <div className="min-h-[450px] flex gap-10 mb-20">
          <div className="h-full w-[60%]  px-5 rounded-xl">
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
              <form className="w-full">
                {/* Ciudad y Colonia */}
                <div className="flex gap-4 mb-8">
                  <div className="w-full">
                    <label htmlFor="" className="font-[500]">
                      Ciudad
                    </label>
                    <input
                      type="text"
                      placeholder="Seleccione tu ciudad"
                      className="p-2 text-sm w-full border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div className="w-full">
                    <label htmlFor="" className="font-[500]">
                      Colonia
                    </label>
                    <input
                      type="text"
                      placeholder="Nombre de la colonia"
                      className="w-full p-2 text-sm border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                {/* Calle numero y CodigoPostal */}
                <div className="flex gap-4 mb-8">
                  <div className="w-full">
                    <label htmlFor="" className="font-[500]">
                      Calle y número
                    </label>
                    <input
                      type="text"
                      placeholder="Nombre de la calle #123"
                      className="w-full p-2 text-sm border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div className="w-full ">
                    <label htmlFor="" className="font-[500]">
                      Código Postal
                    </label>
                    <input
                      type="text"
                      placeholder="86000"
                      className="w-full p-2 text-sm border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                {/* Indicaciones adicionales */}
                <div className="mb-4">
                  <label htmlFor="" className="font-[500]">
                    Indicaciones Adicionales
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Color de casa, dejar en recepción, casa de 2 pisos, etc."
                    className="w-full p-2 text-sm border border-gray-300 rounded-lg"
                  />
                </div>

                {/* Guardar esta dirección  */}
                <div className="w-full flex m-auto justify-center">
                  <input
                    type="checkbox"
                    className="rounded-full"
                    name=""
                    id=""
                  />
                  <label htmlFor="" className="text-sm ms-3">
                    Guardar esta dirección para futuras compras
                  </label>
                </div>
                <hr className="border border-gray-100 my-7" />

                {/* Factura  */}
                <div className="w-full flex m-auto justify-center">
                  <input
                    type="checkbox"
                    className="rounded-full"
                    name=""
                    id=""
                  />
                  <label htmlFor="" className="text-sm ms-3">
                    Se requiere factura
                  </label>
                </div>

                {/* buttons */}
                <div className="w-full flex justify-between mt-10">
                  <Link
                    href="/Shopping-cart"
                    className="w-[50%] text-center text-secundario cursor-pointer py-3"
                  >
                    Volver al carrito
                  </Link>
                  <Button
                    onClick={handlerContinueShipping}
                    title="Continuar con el pago"
                    className="w-[50%] py-3"
                  />
                </div>
              </form>
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

export default Shipping;
