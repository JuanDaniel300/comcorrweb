import { adaptProducts } from "@/adapters/productAdapter";
import ProductCard from "@/components/productCard/ProductCard";
import { getRecomendados } from "@/services/recomendados/recomendados";
import { Product } from "@/types/product.type";
import RecomendadosSlider from "./RecomendadosSlider";

export default async function RecomendadosSection() {
  const recomendados = await getRecomendados();
  const products: Product[] = adaptProducts(recomendados?.promos);

  return <RecomendadosSlider products={products} />;
}
