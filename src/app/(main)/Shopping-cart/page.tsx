import CartView from "@/components/shopping-cart/cart";
import RecomendadosSection from "@/sections/home/recomendados/Recomendados";
import { Suspense } from "react";

const ShoppingCart = async () => {
  return (
    <div className="min-h-screen padding-top ">
      <div className="container mx-auto  py-10">
        <CartView />

        <div className="w-full" id="productPopular">
          <div className="font-semibold text-primario text-2xl">
            También podría interesarte
          </div>

          <div className="flex pt-10 justify-between">
            <Suspense fallback={<div>cargando..</div>}>
              <RecomendadosSection />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
