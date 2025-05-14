"use client"

import { Suspense, useEffect, useState } from "react";

export default function ArticuloGalery() {
    const [selectedImage, setSelectedImage] = useState<string | null>("/products/image_main.png")

    const handleThumbnailClick = (image: string) => {
        setSelectedImage(image)
    }

    useEffect(() => {
        setSelectedImage("/products/image_main.png")
    }, [])

    return (
        <div className=" product__images">
            <div className="product__main__image w-full">
                <img
                    src={selectedImage || ""}
                    className="w-full h-auto object-cover"
                    alt=""
                />
            </div>
            <div className="product__gallery flex justify-between mt-4">
                <div className="product__gallery__item">
                    <img
                        onClick={() => handleThumbnailClick('/gallery/image1.png')}
                        src="/gallery/image1.png"
                        className="w-full h-auto object-cover"
                        alt=""
                    />
                </div>
                <div className="product__gallery__item">
                    <img
                        onClick={() => handleThumbnailClick('/gallery/image2.png')}
                        src="/gallery/image2.png"
                        className="w-full h-auto object-cover"
                        alt=""
                    />
                </div>
                <div className="product__gallery__item">
                    <img
                        onClick={() => handleThumbnailClick('/gallery/image3.png')}
                        src="/gallery/image3.png"
                        className="w-full h-auto object-cover"
                        alt=""
                    />
                </div>
                <div className="product__gallery__item">
                    <img
                        onClick={() => handleThumbnailClick('/gallery/image1.png')}
                        src="/gallery/image1.png"
                        className="w-full h-auto object-cover"
                        alt=""
                    />
                </div>
            </div>
        </div>
    )
}