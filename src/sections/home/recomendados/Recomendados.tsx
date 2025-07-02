import { adaptProducts } from "@/adapters/productAdapter";
import ProductCard from "@/components/productCard/ProductCard";
import { getPopulares } from "@/services/populares/populares";
import { Product } from "@/types/product.type";

export default async function RecomendadosSection() {
  const recomendados = await getPopulares();
  const products: Product[] = adaptProducts(recomendados?.promos);

  return (
    <div className="flex justify-between w-full flex-wrap space-y-10">
      {products.map((product: Product, index: number) => (
        <ProductCard key={index} product={product} keyIndex={index} />
      ))}
    </div>
  );
}
