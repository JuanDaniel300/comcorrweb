"use client";

import { AiOutlineShoppingCart } from "react-icons/ai";
import { CiDiscount1 } from "react-icons/ci";
import { motion } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { formatCurrency } from "@/utils/generic";
import Button from "../Button/Button";

const ProductCard = ({ product, key }: { product: any; key: number }) => {
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);
  //   const navigate = useNav();

  const handleGoToProductView = () => {
    // navigate("/product");
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

  const handlePrev = () => {
    1;
    swiperRef?.slidePrev();
  };

  const handleNext = () => {
    swiperRef?.slideNext();
  };

  return (
    <motion.div
      onClick={handleGoToProductView}
      key={key}
      whileHover={{
        transition: { duration: 0.5 },
      }}
      className="productCard w-[256px] h-max border border-gray-200 bg-white rounded-2xl px-3 pt-4 pb-3 cursor-pointer"
    >
      {/* Image and promotions if had */}
      <div className="relative h-[252px]  rounded-xl w-full">
        <div className="flex items-center gap-3 bg-secundario w-max rounded-lg px-2 absolute">
          <CiDiscount1 color="white" size={25} />
          <span className="text-sm text-white font-[500]">!Oferta!</span>
        </div>
        <div className="relative">
          {/* Image */}
          <Swiper
            onSwiper={setSwiperRef}
            className="w-full bg-white relative"
            direction="horizontal"
            slidesPerView={1}
            modules={[Pagination, Navigation]}
          >
            <SwiperSlide className="bg-white">
              <img
                src="/products/refrigerador.png"
                className="w-full h-full object-cover"
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide className="bg-white">
              <img
                src="/products/image_main2.png"
                className="w-full h-full object-cover"
                alt=""
              />
            </SwiperSlide>
          </Swiper>

          {/* Custom navigation arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute cursor-pointer left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white w-8 h-8 rounded-full flex items-center justify-center border border-gray-200 transition-colors"
            aria-label="Previous slide"
          >
            <FaChevronLeft className="text-gray-700" size={14} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white w-8 h-8 rounded-full flex items-center justify-center border border-gray-200 transition-colors"
            aria-label="Next slide"
          >
            <FaChevronRight className="text-gray-700" size={14} />
          </button>
        </div>
      </div>

      {/* Marca y Tipo */}
      <div className="w-full flex justify-between py-3">
        <div className="font-[500]  text-oscuro2 text-sm">SAMSUNG</div>
        <div className="font-semibold  text-oscuro2 text-sm">Lavadora</div>
      </div>

      {/* Divider */}
      <hr className="text-gray-100" />

      {/* Nombre and Sku */}
      <div className="w-full py-3">
        <div className="text-primario font-semibold">
          {product?.descripcion}
        </div>

        <div className="text-sm font-[500] pt-3">{product?.codigo}</div>
      </div>

      {/* Divider */}
      <hr className="text-gray-100" />

      {/* Price and discount if had */}
      <div className="w-full py-3 flex items-center gap-3">
        <div className="text-secundario font-semibold text-lg">
          {formatCurrency(product?.precio1)}
        </div>
        <div className="text-oscuro2 text-xs line-through">
          {formatCurrency(product?.precio2)}
        </div>
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
    </motion.div>
  );
};

export default ProductCard;
