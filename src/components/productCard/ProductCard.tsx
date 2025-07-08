"use client";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CiDiscount1 } from "react-icons/ci";
import { motion } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { capitalize, formatCurrency, generarSlug } from "@/utils/generic";
import Button from "../Button/Button";
import { Product } from "@/types/product.type";
import { useRouter } from "nextjs-toploader/app";
import { handleAddToCart } from "@/handlers/cartHandlers";
import { useToast } from "@/providers/ToastProviderClient";

const ProductCard = ({
  product,
  keyIndex,
}: {
  product: Product;
  keyIndex: number;
}) => {
  const { cart } = useToast();
  const router = useRouter();
  const hasPromotion = product?.precio1 < product?.precio2;
  const hasDiscount = product?.precio2 > 0;

  const handleGoToProductView = () => {
    const urlPath = `${generarSlug(product?.descripcion)}-${
      product?.id || product?.clave
    }`;

    router.push(`/${urlPath}`);
  };

  const handlerClickAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Lógica para añadir al carrito
    handleAddToCart(product, 1, cart);
  };

  return (
    <motion.div
      onClick={handleGoToProductView}
      key={keyIndex}
      whileHover={{ transition: { duration: 0.5 } }}
      className="productCard h-[400px] w-[188px] min-w-[188px] sm:w-[300px] sm:min-w-[300px] sm:h-[500px] border border-gray-200 bg-white rounded-2xl px-3 pt-4 pb-3 cursor-pointer flex flex-col justify-between"
    >
      {/* Imagen y badge */}
      <div className="relative h-[250px] w-full">
        {hasPromotion && hasDiscount && (
          <div className="flex items-center gap-2 bg-secundario w-max rounded-lg px-2 absolute z-10">
            <CiDiscount1 color="white" size={20} />
            <span className="text-xs text-white font-medium">¡Oferta!</span>
          </div>
        )}

        <div
          className="relative w-full h-full"
          onClick={(e) => e.preventDefault()}
        >
          <ProductGallery product={product} />
        </div>
      </div>

      {/* Marca y línea */}
      <div className="flex justify-between items-center mt-3">
        <div className="font-medium text-oscuro2 text-xs uppercase truncate max-w-[130px]">
          {product?.marca}
        </div>
        <div className="font-semibold text-oscuro2 text-xs truncate max-w-[130px]">
          {capitalize(product?.linea)}
        </div>
      </div>

      <hr className="border border-gray-100 my-2" />

      {/* Descripción y código */}
      <div className="flex flex-col h-[70px] overflow-hidden">
        <div className="text-xs text-primario font-semibold sm:text-sm leading-snug line-clamp-2">
          {product?.descripcion}
        </div>
        <div className="text-xs font-semibold text-gray-600 mt-1">
          {product?.codigo}
        </div>
      </div>

      <hr className="border border-gray-100 my-2" />

      {/* Precio y descuento */}
      <div className="flex items-center gap-3">
        {hasPromotion && hasDiscount ? (
          <>
            <div className="text-secundario font-semibold text-base sm:text-lg">
              {formatCurrency(product?.precio1)}
            </div>
            <div className="text-oscuro2 text-xs sm:text-sm font-semibold line-through">
              {formatCurrency(product?.precio2)}
            </div>
          </>
        ) : (
          <div className="text-secundario font-semibold text-sm sm:text-lg">
            {formatCurrency(product?.precio1)}
          </div>
        )}
      </div>

      {/* Botón */}
      <div className="mt-auto">
        <Button
          variants="primary"
          onClick={handlerClickAddToCart}
          title="Añadir al carrito"
          icon={<AiOutlineShoppingCart color="white" size={20} />}
        />
      </div>
    </motion.div>
  );
};

const ProductGallery = ({ product }: { product: any }) => {
  const [swiperRef, setSwiperRef] = useState<any>(null);

  const images = [product?.imagen1, product?.imagen2, product?.imagen3].filter(
    Boolean
  );
  const isGalleryActive = images.length > 1;

  const handlePrev = () => swiperRef?.slidePrev();
  const handleNext = () => swiperRef?.slideNext();

  if (!isGalleryActive) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white">
        <img
          src={images[0] || "/products/refrigerador.png"}
          alt="Producto"
          className="max-h-full max-w-full object-contain"
        />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-white">
      <Swiper
        onSwiper={setSwiperRef}
        className="w-full h-full"
        direction="horizontal"
        slidesPerView={1}
        loop={true}
        modules={[Pagination, Navigation]}
      >
        {images.map((img, index) => (
          <SwiperSlide
            key={index}
            className="bg-white h-full flex items-center m-auto w-full justify-center"
          >
            <img
              src={img}
              className="max-h-full max-w-full object-contain m-auto"
              alt={`Producto ${index + 1}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white w-8 h-8 rounded-full flex items-center justify-center border border-gray-200"
        aria-label="Slide anterior"
      >
        <FaChevronLeft className="text-gray-700" size={14} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white w-8 h-8 rounded-full flex items-center justify-center border border-gray-200"
        aria-label="Siguiente slide"
      >
        <FaChevronRight className="text-gray-700" size={14} />
      </button>
    </div>
  );
};

export default ProductCard;
