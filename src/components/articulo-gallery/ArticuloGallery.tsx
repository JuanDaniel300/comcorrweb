"use client"

import { useEffect, useState } from "react";

interface Props {
    images: (string | boolean)[];
}

export default function ArticuloGalery({ images }: Props) {
    const [selectedImage, setSelectedImage] = useState<string>("");


    console.log("ArticuloGalery images:", images[0]);
    useEffect(() => {

        if (images && images.length > 0) {
            setSelectedImage(images[0] as string);
        } else {
            setSelectedImage("/products/image_main.png"); // fallback por defecto
        }
    }, [images]);

    const handleThumbnailClick = (image: string) => {
        setSelectedImage(image);
    };

    return (
        <div className="product__images">
            {/* Imagen principal */}
            {selectedImage && (
                <div className="product__main__image w-full  rounded-2xl border-2 border-gray-200 bg-white">
                    <img
                        src={selectedImage}
                        className="w-full h-auto object-cover rounded-lg"
                        alt="Imagen principal del producto"
                    />
                </div>
            )}


            {/* Thumbnails */}
            {images && images.length > 1 && (
                <div className="product__gallery flex justify-between mt-4 gap-2">
                    {images.map((img, index) => (
                        <div
                            key={index}
                            className={`product__gallery__item cursor-pointer rounded overflow-hidden border ${selectedImage === img ? 'border-blue-600' : 'border-gray-300'}`}
                            onClick={() => handleThumbnailClick(img as string)}
                        >
                            <img
                                src={img as string}
                                className="w-20 h-20 object-cover"
                                alt={`Vista ${index + 1}`}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
