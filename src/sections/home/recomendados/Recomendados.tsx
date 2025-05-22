import { AdaptedProduct, adaptProducts } from "@/adapters/productAdapter";
import ProductCard from "@/components/productCard/ProductCard";
import { getRecomendados } from "@/services/recomendados/recomendados";
import { Product } from "@/types/product.type";

export default async function RecomendadosSection() {
  const recomendados = await getRecomendados();
  const products = adaptProducts(recomendados?.promos);
  return (
    <div className="flex justify-between w-full flex-wrap space-y-10">
      {products.map((product: AdaptedProduct, index: number) => (
        <ProductCard
          key={index}
          product={product as Product}
          keyIndex={index}
        />
      ))}
    </div>
  );
}
