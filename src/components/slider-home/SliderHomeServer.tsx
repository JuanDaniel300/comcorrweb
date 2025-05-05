import { Suspense } from "react";
import SliderHomeClient from "./SliderHomeClient";
import cache from "memory-cache";
import { getBanners } from "@/services/home/banner";

export default async function SliderHomeServer() {
  let banners = cache.get("banners");

  if (!banners) {
    banners = await getBanners();

    cache.put("banners", banners, 1000 * 60 * 5);
  }

  return <SliderHomeClient banners={banners?.promos} />;
}
