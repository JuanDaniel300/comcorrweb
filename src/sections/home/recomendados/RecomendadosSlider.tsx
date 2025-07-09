"use client";

import ProductCard from "@/components/productCard/ProductCard";
import { Product } from "@/types/product.type";
import { Swiper, SwiperSlide } from "swiper/react";

export default function RecomendadosSlider({
  products,
}: {
  products: Product[];
}) {
  console.log({ recomendados: products });
  return (
    <div className="w-full">
      <Swiper slidesPerView="auto" spaceBetween={8} className="w-full">
        {products.map((product: Product, index: number) => (
          <SwiperSlide key={index} className="!w-auto">
            <ProductCard product={product} keyIndex={index} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
