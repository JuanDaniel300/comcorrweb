import ProductCard from "@/components/productCard/ProductCard";
import { getPopulares } from "@/services/populares/populares";
import { Producto } from "@/types/product.type";

export default async function PopularesSection() {
    const populares = await getPopulares();


    const popularesFilteres = populares?.promos.map((product: any) => {
        return {
            clave: product.clave,
            descripcion: product.descripcion,
            precio1: product.precio1,
            precio2: product.precio2,
            imagen1: product.imagen1 == null ? false : "http://18.191.238.226:3000/" + product.imagen1,
            imagen2: product.imagen2 == null ? false : "http://18.191.238.226:3000/" + product.imagen2,
            imagen3: product.imagen3 == null ? false : "http://18.191.238.226:3000/" + product.imagen3,
            existencia: product.existencia,
            linea: product.linea,
            marca: product.marca,
            categoria: product.categoria,
            codigo: product.codigo,
        }
    })


    console.log("populares", popularesFilteres);


    return (
        <div className="grid grid-cols-4 w-full">
            {popularesFilteres.map((product: Producto, index: number) => <ProductCard product={product} keyIndex={index} />)}
        </div>
    )
}