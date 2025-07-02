import { adaptProducts } from "@/adapters/productAdapter";
import ProductCard from "@/components/productCard/ProductCard";
import { getPopulares } from "@/services/populares/populares";
import { Product } from "@/types/product.type";

export default async function PopularesSection() {
  const populares = await getPopulares();

  const popularesFilteres: Product[] = adaptProducts(populares?.promos);

  return (
    <div className="flex justify-between w-full flex-wrap space-y-10">
      {popularesFilteres.map((product: Product, index: number) => (
        <ProductCard key={index} product={product} keyIndex={index} />
      ))}
    </div>
  );
}
