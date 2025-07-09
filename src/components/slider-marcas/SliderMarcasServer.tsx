import SliderMarcasClient from "./SliderMarcasClient";
import { getMarcas } from "@/services/marcas/marcas";
import cache from "memory-cache";

export default async function SliderMarcasServer() {
  let marcas = cache.get("marcas");

  if (!marcas) {
    marcas = await getMarcas();

    cache.put("marcas", marcas, 1000 * 60 * 5);
  }

  const marcasFiltered = marcas?.promos?.map(
    (marca: { id: string; imagen: string }) => {
      return {
        id: marca.id,
        imagen:
          marca.imagen == null
            ? false
            : "http://18.191.238.226:3000/" + marca.imagen,
      };
    }
  );

  return <SliderMarcasClient marcas={marcasFiltered} />;
}
