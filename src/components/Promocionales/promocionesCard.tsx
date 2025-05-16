import Link from "next/link";
import Button from "../Button/Button";
import { generarSlug } from "@/utils/generic";

export default function PromocionalesCard({
  promocionales,
}: {
  promocionales: { path: string; nombre: string; id: string };
}) {
  const pathUrl = `${generarSlug(promocionales?.nombre)}-${promocionales?.id}`;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-2">
      <img
        src={promocionales?.path || "/promociones/Comcorr-Promo1.jpg"}
        className="object-scale-down w-max rounded-xl h-max"
        alt=""
      />
      <Link href={`/promocion/${pathUrl}`}>
        <Button title="Ver productos" className="mt-5" />
      </Link>
    </div>
  );
}
