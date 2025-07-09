import PromocionalesCard from "@/components/Promocionales/promocionesCard";
import { getPromocionales } from "@/services/promos/promocionales";

export default async function PromocionalesSection() {
  const promocionales = await getPromocionales();

  return (
    <div className="sm:flex sm:justify-between w-full space-y-5 sm:space-y-0 gap-5 h-max">
      {promocionales?.promos.map(
        (promocional: {
          url_imagen: string;
          nombre: string;
          id: string;
          path: string;
        }) => (
          <PromocionalesCard key={promocional.id} promocionales={promocional} />
        )
      )}
    </div>
  );
}
