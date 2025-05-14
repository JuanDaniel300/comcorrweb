"use client";

import { AiOutlineShoppingCart } from "react-icons/ai";
import { CiDiscount1 } from "react-icons/ci";
import { motion } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Fragment, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { capitalize, formatCurrency } from "@/utils/generic";
import Button from "../Button/Button";
import { redirect } from "next/navigation";

const ProductCard = ({ product, keyIndex }: { product: any; keyIndex: number }) => {

  const hasPromotion = product?.precio1 < product?.precio2;
  const hasDiscount = product?.precio2 > 0;

  console.log("ProductCard", product);

  const handleGoToProductView = () => {
    redirect(`/articulo/${product?.clave}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    console.log("Añadir al carrito");

    // cart({
    //   id: 1,
    //   name: product?.descripcion,
    //   brand: "SAMSUNG",
    //   price: product?.precio1,
    //   image: "/products/refrigerador.png",
    //   quantity: 1
    // })
  };



  return (
    <motion.div
      onClick={handleGoToProductView}
      key={keyIndex}
      whileHover={{
        transition: { duration: 0.5 },
      }}
      className="productCard w-[300px] w-max-[300px] h-max border border-gray-200 bg-white rounded-2xl px-3 pt-4 pb-3 cursor-pointer"
    >
      {/* Image and promotions if had */}
      <div className="relative h-[252px]  rounded-xl w-full ">
        {/* Promotion badge */}

        {
          hasPromotion && hasDiscount && (
            <div className="flex items-center gap-3 bg-secundario w-max rounded-lg px-2 absolute z-10">
              <CiDiscount1 color="white" size={25} />
              <span className="text-sm text-white font-[500]">!Oferta!</span>
            </div>
          )
        }

        <div className="relative w-full mx-auto  h-[250px] max-h-[250px]" onClick={(e) => e.preventDefault()}>
          {/* Image */}
          <ProductGallery product={product} />
        </div>
      </div>

      {/* Marca y linea */}
      <div className="w-full flex justify-between py-3">
        <div className="font-[500]  text-oscuro2 text-sm uppercase">{product?.marca}</div>
        <div className="font-semibold  text-oscuro2 text-sm">{capitalize(product?.linea)}</div>
      </div>

      {/* Divider */}
      <hr className="border border-gray-100" />

      {/* Nombre and Sku */}
      <div className="w-full py-3 ">
        <div className="text-primario font-semibold text-wrap  h-15  items-center flex">
          {product?.descripcion}
        </div>

        <div className="text-sm font-[600] pt-1">{product?.codigo}</div>
      </div>

      {/* Divider */}
      <hr className="border border-gray-100" />

      {/* Price and discount if had */}
      <div className="w-full py-3 flex items-center gap-3">
        {/* 
        {
          hasPromotion && hasDiscount && (
            <div className="text-secundario font-semibold text-sm bg-secundario/20 rounded-lg px-2 py-1">
              {`-${Math.round(((product?.precio2 - product?.precio1) / product?.precio2) * 100)}%`}
            </div>
          )
        } */}

        {
          hasPromotion && hasDiscount ?
            (
              <Fragment>
                <div className="text-secundario font-semibold text-xl">
                  {formatCurrency(product?.precio1)}
                </div>
                <div className="text-oscuro2 text-sm font-[600] line-through">
                  {formatCurrency(product?.precio2)}
                </div>
              </Fragment>
            ) :
            (
              <Fragment>
                <div className="text-secundario font-semibold text-xl">
                  {formatCurrency(product?.precio1)}
                </div>
              </Fragment>
            )
        }

      </div>

      {/* button add producto to cart */}
      <div className="w-full">
        <Button
          variants="primary"
          onClick={handleAddToCart}
          title="Añadir al carrito"
          icon={<AiOutlineShoppingCart color="white" size={25} />}
        />
      </div>
    </motion.div >
  );
};


const ProductGallery = ({ product }: { product: any }) => {
  const [swiperRef, setSwiperRef] = useState<any>(null);

  // Filtrar solo imágenes válidas
  const images = [product?.imagen1, product?.imagen2, product?.imagen3].filter(Boolean);

  // Determinar si hay más de una imagen para activar la galería
  const isGalleryActive = images.length > 1;

  const handlePrev = () => swiperRef?.slidePrev();
  const handleNext = () => swiperRef?.slideNext();

  // Si solo hay una imagen, no usamos Swiper ni los botones
  if (!isGalleryActive) {
    return (
      <div className="w-full h-full bg-white">
        <img
          src={images[0] || "/products/refrigerador.png"}
          alt="Producto"
          className="w-full h-full object-scale-down"
        />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-white ">
      <Swiper
        onSwiper={setSwiperRef}
        className="w-full h-full"
        direction="horizontal"
        slidesPerView={1}
        loop={true}
        modules={[Pagination, Navigation]}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index} className="bg-white h-full">
            <img
              src={img}
              className="w-full h-full object-scale-down"
              alt={`Producto ${index + 1}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Botones de navegación */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white/80 hover:bg-white w-8 h-8 rounded-full flex items-center justify-center border border-gray-200 transition-colors"
        aria-label="Slide anterior"
      >
        <FaChevronLeft className="text-gray-700" size={14} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white/80 hover:bg-white w-8 h-8 rounded-full flex items-center justify-center border border-gray-200 transition-colors"
        aria-label="Siguiente slide"
      >
        <FaChevronRight className="text-gray-700" size={14} />
      </button>
    </div>
  );
};


export default ProductCard;
