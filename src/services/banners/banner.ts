import { TIMER_CACHE } from "@/constants/timer";
import axiosInstance from "../api";
import cache from "memory-cache";

export const getBanners = async () => {
  try {
    let banners = cache.get("banners");

    if (!banners) {
      const response = await axiosInstance.get("/banner");
      banners = response?.data;

      cache.put("banners", banners, TIMER_CACHE);
    }

    return banners;
  } catch (error: any) {
    console.error("Error fetching banner:", error.message);
    return [];
  }
};
