"use client";

import { categoriesHome } from "@/constants/generic";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function CategoriasSection() {
  return (
    <div className="w-full">
      <div className="sm:hidden w-full">
        <Swiper
          modules={[FreeMode]}
          slidesPerView="auto"
          freeMode
          grabCursor
          className="!px-2 sm:hidden"
        >
          {categoriesHome.map((value, index) => (
            <SwiperSlide key={index}>
              <div
                className="sm:text-center sm:mx-auto w-max sm:w-full"
                key={index}
              >
                <div className="rounded-full py-4 px-0 sm:px-2 sm:py-8 w-max sm:w-full mx-auto sm:mx-0 bg-primario clickeable">
                  <img
                    src={value?.path}
                    className="w-28 sm:w-full h-full object-scale-down"
                    alt=""
                  />
                </div>
                <div className=" font-semibold text-center  text-sm py-4">
                  {value?.name}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop: Grid/flex distribuido */}
      <div className="hidden lg:flex w-full justify-between gap-4">
        {categoriesHome.map((value, index) => (
          <div className="text-center mx-auto :w-full" key={index}>
            <div className="rounded-full px-2 py-8 w-full mx-0 bg-primario clickeable">
              <img
                src={value?.path}
                className="w-28 sm:w-full h-full object-scale-down"
                alt=""
              />
            </div>
            <div className=" font-semibold text-center  text-sm py-4">
              {value?.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
