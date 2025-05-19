"use client";

import { BsCartX } from "react-icons/bs";
import { LuPackage } from "react-icons/lu";
import { BiSolidOffer } from "react-icons/bi";
import { useRouter } from 'nextjs-toploader/app';

import Button from "../Button/Button";

export default function EmptyCart() {
    const router = useRouter();

    return (
        <div className="min-h-[450px] flex gap-10 mb-20">
            <div className="mx-auto w-full flex justify-center  m-auto">
                <div className="space-y-8">
                    <BsCartX className="text-secundario mx-auto text-center" size={60} />
                    <h1 className="text-oscuro text-2xl font-bold text-center">Aún no tienes productos en tu carrito</h1>
                    <h1 className="text-center text font-[600]">Explora nuestra tienda y encuentra los productos ideales para tu hogar. <br />
                        Llena tu carrito con calidad y comodidad</h1>
                    <div className="flex justify-between gap-40">
                        <Button onClick={() => router.push("/")} title="Ver Productos" variants="outline" icon={<LuPackage size={20} />} />
                        <Button onClick={() => router.push("/")} title="Explorar Ofertas" icon={<BiSolidOffer size={20} />} />
                    </div>
                </div>
            </div>
        </div>
    )
}