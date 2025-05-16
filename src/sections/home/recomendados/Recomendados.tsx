import ProductCard from "@/components/productCard/ProductCard";
import { getRecomendados } from "@/services/recomendados/recomendados";
import { Producto } from "@/types/product.type";

export default async function RecomendadosSection() {
  const recomendados = await getRecomendados();

  return (
    <div className="flex justify-between w-full">
      {recomendados?.promos.map((product: Producto, index: number) => (
        <ProductCard key={index} product={product} keyIndex={index} />
      ))}
    </div>
  );
}
