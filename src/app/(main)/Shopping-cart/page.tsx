import Button from "@/components/Button/Button";
import ListShoppingCart from "@/components/cart/listShoppingCart.component";
import RecomendadosSection from "@/sections/home/recomendados/Recomendados";
import { Suspense } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiPackage } from "react-icons/bi";

const products = [
    {
        id: 1,
        marca: "SAMSUNG",
        name: "Lavadora Aqua Saving 19 Kilos Samsung",
        sku: "WA19A3351GW/AX",
        price: "$8,499.00",
        image: "/products/refrigerador.png",
        quantity: 1,
        isOffer: true,
        offerDetails: {
            discount: 3000,
            discountType: "MXN",
        },
    },

    {
        id: 1,
        marca: "MIRAGE",
        name: "REFRIGERADOR 10” ACERO TM",
        sku: "MRX10FS",
        price: "$6,499.00",
        image: "/products/refrigerador2.png",
        quantity: 1,
        isOffer: true,
        offerDetails: {
            discount: 3000,
            discountType: "MXN",
        },
    },
];

const ShoppingCart = () => {


    return (
        <div className="min-h-screen padding-top ">
            <div className="container mx-auto  py-10">
                <div className="min-h-[450px] flex gap-10 mb-20">
                    <div className="h-full w-[70%] bg-white border border-gray-200 p-5 rounded-xl">
                        <div className="text-2xl text-primario font-semibold">Carrito</div>

                        <div className="w-full my-2">
                            <ListShoppingCart products={products} />
                        </div>
                    </div>
                    <div className="h-full w-[30%] bg-white border border-gray-200 p-5 rounded-xl">
                        <div className="border-b-2 border-gray-100 pb-5">
                            {/* Resumen de pedido, fecha de envio */}
                            <div className="text-xl  font-[500]">Resumen del Pedido</div>
                            <div className=" font-[600] my-3">Entrega</div>
                            <div className="text-sm text-oscuro2">
                                Fecha de entrega estimada: 4/02/2025
                            </div>
                        </div>

                        {/* Subtotal, Descuento, Envio */}
                        <div className="border-b-2 border-gray-100 pt-5 pb-0">
                            <div className="flex space-y-4 justify-between m-auto">
                                <div className="text-oscuro2 text-sm">Subtotal</div>
                                <div className="text-oscuro2 text-base">$17,998.00</div>
                            </div>
                            <div className="flex space-y-4 justify-between m-auto">
                                <div className="text-oscuro2 text-sm">Descuento</div>
                                <div className="text-oscuro2 text-base">-$3,000.00</div>
                            </div>
                            <div className="flex space-y-4 justify-between m-auto">
                                <div className="text-oscuro2 text-sm">Envio</div>
                                <div className="text-oscuro2 text-base">$0.00</div>
                            </div>
                        </div>

                        {/* Total */}
                        <div className="flex justify-between m-auto py-3">
                            <div className="font-semibold text-lg">Total</div>
                            <div className="text-secundario font-semibold text-xl">
                                $14,998.00
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="w-full space-y-4">
                            <Button
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
                        </div>
                    </div>
                </div>

                <div className="w-full" id="productPopular">
                    <div className="font-semibold text-primario text-2xl">
                        También podría interesarte
                    </div>

                    <div className="flex pt-10 justify-between">
                        <Suspense fallback={<div>cargando..</div>}>
                            <RecomendadosSection />
                        </Suspense>
                        {/* <ProductCard key={5} />
                        <ProductCard key={6} />
                        <ProductCard key={7} />
                        <ProductCard key={8} /> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;