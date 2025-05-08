import { Suspense } from "react";
import SliderHomeClient from "./SliderHomeClient";
import cache from "memory-cache";
import { getBanners } from "@/services/banners/banner";

export default async function SliderHomeServer() {
  const banners = await getBanners();


  return <SliderHomeClient banners={banners?.promos} />;
}
