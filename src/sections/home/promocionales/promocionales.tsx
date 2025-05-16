import PromocionalesCard from "@/components/Promocionales/promocionesCard";
import { getPromocionales } from "@/services/promos/promocionales";

export default async function PromocionalesSection() {
  const promocionales = await getPromocionales();

  return (
    <div className="flex justify-between w-full gap-5">
      {promocionales?.promos.map(
        (promocionales: { path: string }, index: number) => (
          <PromocionalesCard key={index} promocionales={promocionales} />
        )
      )}
    </div>
  );
}
