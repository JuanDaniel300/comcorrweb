import ArticuloGalery from "@/components/articulo-gallery/ArticuloGallery";
import Button from "@/components/Button/Button";
import RecomendadosSection from "@/sections/home/recomendados/Recomendados";
import { Suspense } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GoDash, GoPlus } from "react-icons/go";
import { IoShareSocialOutline } from "react-icons/io5";

const ProductView: React.FC = () => {


    //   const { cart } = useToast()

    // const handleAddToCart = (e: React.MouseEvent) => {
    //     e.preventDefault();
    //     e.stopPropagation();


    //     // cart({
    //     //   id: 1,
    //     //   name: "Lavadora Aqua Saving 19 Kilos Samsung",
    //     //   brand: "SAMSUNG",
    //     //   price: 8490,
    //     //   image: "/products/refrigerador.png",
    //     //   quantity: 1
    //     // })
    // }





    return (
        <div className="min-h-screen bg-gray-100 p-4 padding-top">
            <div className="container mx-auto  py-10">
                {/* Breadcrums */}
                <div className="w-full mb-10">
                    {/* <Breadcrumbs /> */}
                </div>

                {/* Content */}
                <div className="w-full product__container h-max">
                    <div className="grid grid-cols-2 gap-20">
                        {/* Images and gallery */}
                        <ArticuloGalery />

                        {/* Producto details */}
                        <div className=" product__details">
                            <div className="w-full flex justify-end">
                                <div className="product__shared cursor-pointer">
                                    <IoShareSocialOutline size={20} />
                                </div>
                            </div>

                            <div className="w-full space-y-4">
                                {/* Marca, Nombre */}
                                <div className="product__marca font-[500] text-lg">Samsung</div>
                                <div className="product__nombre text-2xl font-semibold">
                                    Lavadora Aqua Saving 19 Kilos Samsung
                                </div>
                                <div className="product__sku text-oscuro2">WA19A3351GW/AX</div>
                                <div className="product__price space-x-5 flex">
                                    <span className="product__price__old text-3xl text-red-600 font-semibold">
                                        $ 8,499.00
                                    </span>
                                    <span className="product__price__new text line-through mb-auto">
                                        $ 11,499.00
                                    </span>
                                </div>
                                <div className="product__select__color">
                                    <div className="font-[500] text-lg">Elige tu color</div>
                                    <div className="text-oscuro2 text-sm">Color: Blanco</div>
                                    <div className="flex space-x-4 mt-3">
                                        <div className="h-6 w-6 rounded-full bg-white border border-blue-800"></div>
                                        <div className="h-6 w-6 rounded-full bg-gray-700"></div>
                                    </div>
                                </div>
                                <div className="product__select__size space-y-3">
                                    <div className="font-[500] text-lg">Elige tu capacidad</div>
                                    <div className="flex space-x-4 ">
                                        <div className="text-white font-[400] bg-degradado-primario px-4 rounded-lg py-2 text-sm">
                                            19 Kg
                                        </div>
                                        <div className="text-primario font-[400] border border-primario px-4 rounded-lg py-2 text-sm">
                                            20 Kg
                                        </div>
                                        <div className="text-primario font-[400] border border-primario px-4 rounded-lg py-2 text-sm">
                                            22 Kg
                                        </div>
                                    </div>
                                </div>

                                <div className="product__buttons flex w-full space-x-10 py-3">
                                    <div className="quantity flex-1 w-full">
                                        <div className="flex items-center border border-gray-200 bg-white py-1 w-[100%] px-5 rounded-2xl">
                                            <button className=" text-gray-700 px-2 py-1 rounded-l m-auto cursor-pointer">
                                                <GoDash color="#e12424" size={25} />
                                            </button>
                                            <span className="mx-3 text-sm font-[500]">1</span>
                                            <button className=" text-gray-700 px-2 py-1 rounded-r m-auto cursor-pointer">
                                                <GoPlus color="#02308e" size={25} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <Button
                                            variants="primary"
                                            title="Añadir al carrito"
                                            icon={<AiOutlineShoppingCart color="white" size={25} />}
                                        />
                                    </div>
                                </div>

                                <div className="product__description">
                                    <div className="font-[500] text-lg mb-3">Descripcion</div>
                                    <div className="text-sm font-[400]">
                                        Ahorra hasta 76% de agua gracias a la Tecnología Aqua Saver
                                        Green. Agitador Spiral Washing, limpieza impecable para todo
                                        tipo de prendas y cargas grandes. Cuenta con canasta Sphere
                                        Care de gran capacidad que ayuda a una máxima limpieza y
                                        rápido secado de la ropa.
                                    </div>
                                </div>

                                <div className="product__caracteristicas">
                                    <div className="font-[500] text-lg mb-3">Caracteristicas</div>
                                    <div className="text-sm font-[400]">
                                        Tina Diamante. Protege la ropa de posibles daños. El diseño
                                        único "soft curl" de la Tina Diamante lava la ropa de forma
                                        muy eficaz y cuidadosa. Sus bordes lisos en forma de
                                        diamante son suaves incluso con las prendas delicadas.
                                        Además, los pequeños orificios de salida de agua también
                                        evitan que los tejidos queden atrapados y se dañen
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full mt-30" id="productPopular">
                    <div className="font-semibold text-primario text-2xl">
                        También podría interesarte
                    </div>

                    <div className="pt-10">
                        <Suspense fallback={<div>cargando..</div>}>
                            <RecomendadosSection />
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductView;
