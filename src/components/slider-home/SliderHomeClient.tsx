"use client";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type banner = {
  id: number;
  image: string;
  name: string;
};

export default function SliderHomeClient({ banners }: { banners: banner[] }) {
  return (
    <div className="h-max w-full">
      <Swiper
        navigation
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        className="w-full"
        direction="horizontal"
        grabCursor={true}
        slidesPerView={1}
        modules={[Pagination, Navigation, Autoplay]}
      >
        {banners.map((promo: banner) => {
          return (
            <SwiperSlide key={promo.id} className="w-full">
              <img
                src={"/Comcorr.jpg"}
                className="object-cover w-full h-full rounded-lg"
                alt={promo.name}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
