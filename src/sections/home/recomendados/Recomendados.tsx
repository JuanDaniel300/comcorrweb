import ProductCard from "@/components/productCard/ProductCard";
import { getRecomendados } from "@/services/recomendados/recomendados";
import { Producto } from "@/types/product.type";

export default async function RecomendadosSection() {
    const recomendados = await getRecomendados();

    return (
        <div className="grid grid-cols-4 w-full">
            {recomendados?.promos.map((product: Producto, index: number) => <ProductCard product={product} keyIndex={index} />)}
        </div>
    )
}