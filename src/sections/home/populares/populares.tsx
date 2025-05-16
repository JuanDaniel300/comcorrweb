import { AdaptedProduct, adaptProducts } from "@/adapters/productAdapter";
import ProductCard from "@/components/productCard/ProductCard";
import { getPopulares } from "@/services/populares/populares";

export default async function PopularesSection() {
  const populares = await getPopulares();

  const popularesFilteres = adaptProducts(populares?.promos);

  return (
    <div className="flex justify-between w-full">
      {popularesFilteres.map((product: AdaptedProduct, index: number) => (
        <ProductCard key={index} product={product} keyIndex={index} />
      ))}
    </div>
  );
}
