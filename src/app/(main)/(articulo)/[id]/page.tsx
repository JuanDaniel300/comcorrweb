import { adaptProducts } from "@/adapters/productAdapter";
import ArticuloGalery from "@/components/articulo-gallery/ArticuloGallery";
import Breadcrumbs from "@/components/Breadcrumbs/breadCrumbs";
import ButtonAddProduct from "@/components/productCard/ButtonAddProduct";
import RecomendadosSection from "@/sections/home/recomendados/Recomendados";
import { getArticulosById } from "@/services/articulos/articulos";
import { Product } from "@/types/product.type";
import { capitalize, formatCurrency, slugATexto } from "@/utils/generic";
import { Suspense } from "react";
import { CiDiscount1 } from "react-icons/ci";
import { GoDash, GoPlus } from "react-icons/go";
import { IoShareSocialOutline } from "react-icons/io5";

type Params = Promise<{ id: string }>;

const ProductView = async (props: { params: Params }) => {
  const params = await props.params;
  const id = params.id;

  const productTitle = capitalize(
    slugATexto(id.split("-").slice(0, -1).join("-"))
  ).toUpperCase();
  const productId = id.split("-").pop() as string;

  const productDetails = await getArticulosById(productId);
  const [product] = adaptProducts([productDetails?.articulo]);

  const hasPromotion = product?.precio1 < product?.precio2;
  // const hasDiscount = product?.precio2 > 0;

  return (
    <div className="min-h-screen bg-gray-100 p-4 padding-top">
      <div className="container mx-auto py-10">
        {/* Breadcrums */}
        <div className="w-full mb-10">
          <Breadcrumbs
            Breadcrumbs={[
              {
                title: capitalize(product?.marca),
                link: "/",
              },
              {
                title: capitalize(product?.linea),
                link: "",
              },
              {
                title: productTitle,
                link: "",
              },
            ]}
          />
        </div>

        <div className="w-full product__container h-max">
          <div className="grid grid-cols-2 gap-20">
            {/* Galería de imágenes */}
            <ArticuloGalery
              images={
                [product.imagen1, product.imagen2, product.imagen3].filter(
                  (img): img is string => img !== null && img !== undefined
                ) as (string | boolean)[]
              }
            />

            {/* Detalles del producto */}
            <div className="product__details">
              <div className="w-full flex justify-between">
                <div className="product__promotion mb-10">
                  {hasPromotion && (
                    <div className="flex items-center gap-2 bg-secundario w-max rounded-lg px-2 absolute z-10">
                      <CiDiscount1 color="white" size={25} />
                      <span className="text-lg text-white font-medium ">
                        ¡Oferta!
                      </span>
                    </div>
                  )}
                </div>
                <div className="product__shared cursor-pointer">
                  <IoShareSocialOutline size={25} />
                </div>
              </div>

              <div className="w-full space-y-4">
                <div className="product__marca font-[600] text-lg">
                  {product.marca}
                </div>
                <div className="product__nombre text-2xl font-bold uppercase">
                  {productTitle}
                </div>
                <div className="product__sku text-oscuro2 font-[500]">
                  {product.codigo}
                </div>
                <div className="product__price space-x-5 flex">
                  <span className="product__price__old text-4xl text-red-600 font-semibold">
                    {formatCurrency(product.precio1)}
                  </span>
                  {product.precio2 && (
                    <span className="product__price__new text line-through mb-auto font-semibold tetx-oscuro2">
                      {formatCurrency(product.precio2)}
                    </span>
                  )}
                </div>

                {/* Puedes ocultar esta sección si no manejas colores */}
                <div className="product__select__color">
                  <div className="font-[500] text-lg">Elige tu color</div>
                  <div className="text-oscuro2 text-sm">Color: Blanco</div>
                  <div className="flex space-x-4 mt-3">
                    <div className="h-6 w-6 rounded-full bg-white border border-blue-800"></div>
                    <div className="h-6 w-6 rounded-full bg-gray-700"></div>
                  </div>
                </div>

                {/* Puedes ajustar esto según los atributos disponibles */}
                {/* <div className="product__select__size space-y-3">
                                    <div className="font-[500] text-lg">Existencia</div>
                                    <div className="text-primario font-[400]">
                                        {product.existencia > 0 ? `${product.existencia} disponibles` : "Agotado"}
                                    </div>
                                </div> */}

                <div className="product__buttons flex w-full space-x-10 py-3">
                  <div className="quantity flex-1 w-full">
                    <div className="flex items-center border border-gray-200 bg-white py-1 w-[100%] px-5 rounded-2xl">
                      <button className="text-gray-700 px-2 py-1 rounded-l m-auto cursor-pointer">
                        <GoDash color="#e12424" size={25} />
                      </button>
                      <span className="mx-3 text-sm font-[500]">1</span>
                      <button className="text-gray-700 px-2 py-1 rounded-r m-auto cursor-pointer">
                        <GoPlus color="#02308e" size={25} />
                      </button>
                    </div>
                  </div>
                  <div className="w-full">
                    <ButtonAddProduct
                      product={product as Product}
                      quantity={1}
                    />
                  </div>
                </div>

                <div className="product__description">
                  <div className="font-[500] text-lg mb-3">Descripción</div>
                  <div className="text-sm font-[400]">
                    {product.descripcion ||
                      "No se proporcionó una descripción para este producto."}
                  </div>
                </div>

                <div className="product__caracteristicas">
                  <div className="font-[500] text-lg mb-3">Características</div>
                  <div className="text-sm font-[400]">
                    Línea: {product.linea} <br />
                    Categoría: {product.categoria} <br />
                    Marca: {product.marca}
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
            <Suspense fallback={<div>cargando...</div>}>
              <RecomendadosSection />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
