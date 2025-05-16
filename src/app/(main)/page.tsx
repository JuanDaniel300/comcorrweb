import ProductCard from "@/components/productCard/ProductCard";
import SliderHome from "@/components/slider-home";
import SliderMarcas from "@/components/slider-marcas";
import { categoriesHome, promociones } from "@/constants/generic";
import PopularesSection from "@/sections/home/populares/populares";
import PromocionalesSection from "@/sections/home/promocionales/promocionales";
import RecomendadosSection from "@/sections/home/recomendados/Recomendados";
import { Suspense } from "react";
import { CgShoppingBag } from "react-icons/cg";
import { CiDiscount1 } from "react-icons/ci";
import { MdPhoneInTalk } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

export default function HomePage() {
  return (
    <div className="min-h-screen mb-20 padding-top ">
      {/* Section 1 */}
      <section className="container mx-auto pt-10 space-y-15">
        {/* Slider */}
        <div className="w-full">
          <Suspense fallback={<div>cargando..</div>}>
            <SliderHome />
          </Suspense>
        </div>

        {/* Categorias */}
        <div id="categories" className="w-full space-y-10">
          <div className="text-primario font-semibold text-2xl">
            Encuentra lo que Necesitas
          </div>

          <div className="flex gap-20 items-center justify-center">
            {categoriesHome.map((value, index) => (
              <div className="text-center mx-auto" key={index}>
                <div className="rounded-full px-2 py-8 bg-primario clickeable">
                  <img
                    src={value?.path}
                    className="w-full h-full object-scale-down"
                    alt=""
                  />
                </div>
                <div className=" font-semibold text-sm py-4">{value?.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marcas */}
      <div id="marcas" className="w-full my-20">
        <div className="text-center text-primario font-semibold text-2xl">
          Trabajamos con las Mejores Marcas
        </div>

        <div className="w-full h-max py-5 mt-5 bg-white">
          <Suspense fallback={<div>cargando..</div>}>
            <SliderMarcas />
          </Suspense>
        </div>
      </div>

      {/* Section 2 */}
      <section className="container mx-auto   space-y-28">
        {/* Products popular */}
        <div className="w-full" id="productPopular">
          <div className="font-semibold text-primario text-2xl">
            Lo Más Popular Entre Nuestros Clientes
          </div>

          <div className="flex pt-10 justify-between">
            <Suspense fallback={<div>cargando..</div>}>
              <PopularesSection />
            </Suspense>
          </div>
        </div>

        {/* Promociones */}
        <div className="w-full" id="promociones">
          <div className="font-semibold text-primario text-2xl">
            Promociones hechas para ti
          </div>

          <div className="flex justify-between mt-10 gap-10">
            <PromocionalesSection />
          </div>
        </div>

        {/* Recomendados */}
        <div className="w-full" id="recomendados">
          <div className="font-semibold text-primario text-2xl">
            Recomendados para tu Hogar
          </div>

          <div className=" pt-10 recomendados__products__container">
            <Suspense fallback={<div>cargando..</div>}>
              <RecomendadosSection />
            </Suspense>
          </div>
        </div>

        {/* Ofrecemos */}
        <div className="w-full" id="ofrecemos">
          <div className="font-semibold text-center text-primario text-2xl">
            Todo lo que Ofrecemos para Ti
          </div>

          <div className="flex pt-10 justify-between gap-16">
            <div className="cardGoalItem max-w-[286px] space-y-2 bg-claro1 p-5 rounded-xl">
              <div>
                <CgShoppingBag color="red" size={30} />
              </div>

              <div className="text-primario font-semibold">
                Compra Fácil y Segura
              </div>

              <div className="text-sm">
                Realiza tus compras de manera rápida y segura
              </div>
            </div>

            <div className="cardGoalItem max-w-[286px] space-y-2 bg-claro1 p-5 rounded-xl">
              <div>
                <CiDiscount1 color="red" size={30} />
              </div>

              <div className="text-primario font-semibold">
                Promociones Exclusivas
              </div>

              <div className="text-sm">
                Aprovecha descuentos únicos y ofertas diseñadas para ti
              </div>
            </div>

            <div className="cardGoalItem max-w-[286px] space-y-2 bg-claro1 p-5 rounded-xl">
              <div>
                <MdPhoneInTalk color="red" size={30} />
              </div>

              <div className="text-primario font-semibold">Soporte 24/7</div>

              <div className="text-sm">
                Atención personalizada en todo momento para resolver tus dudas
              </div>
            </div>

            <div className="cardGoalItem max-w-[286px] space-y-2 bg-claro1 p-5 rounded-xl">
              <div>
                <RiMoneyDollarCircleLine color="red" size={30} />
              </div>

              <div className="text-primario font-semibold">
                Opciones de Pago
              </div>

              <div className="text-sm">
                Paga como prefieras: efectivo o tarjetas
              </div>
            </div>
          </div>
        </div>

        {/* Map */}

        <div className="w-full" id="map">
          <div className="font-semibold text-center text-primario text-2xl">
            Encuentra tu Sucursal Más Cercana
          </div>

          <div className="text-center text-sm my-3">
            Ubica nuestras tiendas físicas para descubrir aún más productos y
            servicios. !Te esperamos con las puertas abiertas!
          </div>

          <div className="h-[468px] border border-gray-200 bg-white rounded-xl"></div>
        </div>
      </section>
    </div>
  );
}
