import { Suspense } from "react";
import SliderMarcasClient from "./SliderMarcasClient";

export default async function SliderMarcasServer() {
  let marcas = [];

  return (
    <Suspense>
      <SliderMarcasClient marcas={marcas} />
    </Suspense>
  );
}
