import Link from "next/link";
import Button from "../Button/Button";
import { generarSlug } from "@/utils/generic";

export default function PromocionalesCard({
  promocionales,
}: {
  promocionales: { url_imagen: string; nombre: string; id: string };
}) {
  const pathUrl = `${generarSlug(promocionales?.nombre)}-${promocionales?.id}`;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-2 h-full flex flex-col">
      {/* Imagen con altura fija y centrada */}
      <div className="w-full sm:h-[700px] flex items-center justify-center overflow-hidden rounded-xl">
        <img
          src={promocionales?.url_imagen || "/promociones/Comcorr-Promo1.jpg"}
          className="object-contain h-full w-full"
          alt={promocionales?.nombre}
        />
      </div>

      {/* Espacio entre imagen y botón */}
      <div className="mt-auto pt-4">
        <Link href={`/promocion/${pathUrl}`}>
          <Button title="Ver productos" className="w-full" />
        </Link>
      </div>
    </div>
  );
}
