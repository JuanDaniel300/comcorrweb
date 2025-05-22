"use client";

import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiPackage } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import { useRouter } from "nextjs-toploader/app";
import Breadcrumbs from "@/components/Breadcrumbs/breadCrumbs";
import Button from "@/components/Button/Button";

const Confirmation = () => {
  const router = useRouter();
  const handlerFollowShopping = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    router.push("/");
  };

  const handlerSeeOrders = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    router.push("/profile/orders");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 padding-top">
      <div className="max-w-2xl my-10 mx-auto">
        {/* Borde superior con picos */}
        <div className="h-8 bg-transparent">
          <svg
            className="w-full h-8 fill-white"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            <polygon points="0,100 2.5,0 7.5,100 12.5,0 17.5,100 22.5,0 27.5,100 32.5,0 37.5,100 42.5,0 47.5,100 52.5,0 57.5,100 62.5,0 67.5,100 72.5,0 77.5,100 82.5,0 87.5,100 92.5,0 97.5,100 100,100" />
          </svg>
        </div>

        {/* Contenido principal */}
        <div className="bg-white px-8 py-6 space-y-6">
          {/* Breadcrumb */}
          <div className="flex justify-center">
            <Breadcrumbs
              Breadcrumbs={[
                { title: "Carrito", link: "/" },
                { title: "Envio", link: "/" },
                { title: "Pago", link: "/" },
              ]}
            />
          </div>

          <div className="text-center space-y-2">
            <div className="w-12 h-12  rounded-full flex items-center justify-center mx-auto">
              <FiCheckCircle className=" text-primario" size={70} />
            </div>
            <h1 className="text-2xl mb-4 font-bold text-blue-900">
              Pedido Confirmado
            </h1>
            <p className="text-red-600 mb-4 font-semibold">
              ¡Tu Pedido Ha Sido Confirmado!
            </p>
            <p className="text-sm text-gray-600">
              Hemos enviado los detalles de tu compra a tu correo.
              <br />
              Pronto recibirás tu pedido en casa
            </p>
          </div>

          <hr className="border border-gray-100" />

          <div className="text-center">
            <p className="text-sm text-gray-600">Número de Pedido:</p>
            <p className="text-2xl font-bold text-blue-900">12345</p>
            <h2 className="text-oscuro2 mt-3">Resumen de compra</h2>
          </div>

          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-4 border-r-2 border-gray-100">
                <div>
                  <p className="">Ciudad</p>
                  <p className="text-sm ms-5 mt-2 text-oscuro3">Macuspana</p>
                </div>
                <div>
                  <p className="">Colonia</p>
                  <p className="text-sm ms-5 mt-2 text-oscuro3">Centro</p>
                </div>
                <div>
                  <p className="">Calle y número</p>
                  <p className="text-sm ms-5 mt-2 text-oscuro3">
                    Av. Alatorre 46
                  </p>
                </div>
                <div>
                  <p className="">Código Postal</p>
                  <p className="text-sm ms-5 mt-2 text-oscuro3">86700</p>
                </div>
                <div>
                  <p className="">Indicaciones Adicionales</p>
                  <p className="text-sm ms-5 mt-2 text-oscuro3">
                    Casa color turquesa con porton blanco
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4 border border-gray-200 rounded-xl py-2">
                  <img
                    src="/products/refrigerador.png"
                    alt="Samsung Lavadora"
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                  <div>
                    <p className="font-semibold text-sm text-oscuro3">
                      SAMSUNG
                    </p>
                    <p className="text-sm text-oscuro3">
                      Lavadora Aqua Saving 19 Kilos Samsung
                    </p>
                    <p className="text-sm text-oscuro3 font-semibold">x1</p>
                  </div>
                </div>

                <div className="flex gap-4 border border-gray-200 rounded-xl py-2">
                  <img
                    src="/products/refrigerador2.png"
                    alt="Mirage Refrigerador"
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                  <div>
                    <p className="text-sm text-oscuro3 font-semibold">MIRAGE</p>
                    <p className="text-sm text-oscuro3">
                      Refrigerador 10 Pies Midea Blue Steel Top Mount
                    </p>
                    <p className="text-sm text-oscuro3 font-semibold">x1</p>
                  </div>
                </div>

                <div className="pt-4">
                  <div className="flex  items-center">
                    <p className="font-[500] text-oscuro2">Total:</p>
                    <p className="ms-4 text-xl font-[500] text-red-600">
                      $14,998.00
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* button and message */}
          <div className="space-y-3 pt-4">
            <Button
              onClick={handlerFollowShopping}
              title="Seguir Comprando"
              variants="primary"
              className="font-[500]"
              icon={<AiOutlineShoppingCart size={25} />}
            />

            <Button
              onClick={handlerSeeOrders}
              title="Ver Mis Pedidos"
              variants="outline"
              className="font-[500]"
              icon={<BiPackage size={25} />}
            />

            <button className="w-full text-center text-secundario cursor-pointer py-3 flex mx-auto justify-center">
              <FaWhatsapp className="me-3" size={20} />
              Soporte en Whatsapp
            </button>

            <div className="w-full">
              <text className="text-oscuro2 text-sm text-center justify-center flex font-[500]">
                Si tienes duda a cerca del pedido, comuniquese al correo
                hola@ejemplo.com
              </text>
            </div>
          </div>
        </div>

        {/* Borde inferior con picos */}
        <div className="h-8 bg-transparent">
          <svg
            className="w-full h-8 fill-white rotate-180"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            <polygon points="0,100 2.5,0 7.5,100 12.5,0 17.5,100 22.5,0 27.5,100 32.5,0 37.5,100 42.5,0 47.5,100 52.5,0 57.5,100 62.5,0 67.5,100 72.5,0 77.5,100 82.5,0 87.5,100 92.5,0 97.5,100 100,100" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
