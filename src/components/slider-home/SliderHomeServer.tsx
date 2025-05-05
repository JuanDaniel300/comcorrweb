import { Suspense } from "react";
import SliderHomeClient from "./SliderHomeClient";

export default async function SliderHomeServer() {
  const banners = [];

  return (
    <Suspense>
      <SliderHomeClient banners={banners} />;
    </Suspense>
  );
}
