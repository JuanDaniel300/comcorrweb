import { adaptProducts } from "@/adapters/productAdapter";
import { getPopulares } from "@/services/populares/populares";
import { Product } from "@/types/product.type";
import PopularesSlider from "./popularesSlider";

export default async function PopularesSection() {
  const populares = await getPopulares();

  const popularesFilteres: Product[] = adaptProducts(populares?.promos);

  return <PopularesSlider products={popularesFilteres} />;
}
