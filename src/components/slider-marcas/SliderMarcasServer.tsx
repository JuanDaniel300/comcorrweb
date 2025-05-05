import { Suspense } from "react";
import SliderMarcasClient from "./SliderMarcasClient";
import { getMarcas } from "@/services/marcas/marcas";
import cache from "memory-cache";

export default async function SliderMarcasServer() {
  let marcas = cache.get("marcas");

  if (!marcas) {
    marcas = await getMarcas();

    cache.put("marcas", marcas, 1000 * 60 * 5);
  }

  return <SliderMarcasClient marcas={marcas?.promos} />;
}
