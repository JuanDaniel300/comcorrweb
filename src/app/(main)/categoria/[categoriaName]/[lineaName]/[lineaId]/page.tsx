import { adaptProducts } from "@/adapters/productAdapter";
import ProductGrid from "@/components/productGrid/ProductGrid";
import { getLineasProduct } from "@/services/lineas/lineas";
import { slugATexto } from "@/utils/generic";


// Mock data for products
const PRODUCTS = [
    {
        id: 1,
        clave: '000012',
        brand: "SAMSUNG",
        type: "Lavadora",
        descripcion: "Lavadora Aqua Saving 19 Kilos Samsung",
        codigo: "WA19A3351GW/AX",
        precio1: 8499.0,
        precio2: 11499.0,
        image: "/placeholder.svg?height=200&width=200",
        onSale: true,
    },
    {
        id: 2,
        clave: '000012',
        brand: "LG",
        type: "Lavadora",
        descripcion: "Lavadora Aqua Saving 19 Kilos Samsung",
        codigo: "WT17BSS",
        precio1: 7999.0,
        precio2: 9999.0,
        image: "/placeholder.svg?height=200&width=200",
        onSale: true,
    },
    {
        id: 3,
        clave: '000012',
        brand: "SAMSUNG",
        type: "Lavadora",
        descripcion: "Lavadora Aqua Saving 19 Kilos Samsung",
        codigo: "WA15A3352GW/AX",
        precio1: 6999.0,
        precio2: 8999.0,
        image: "/placeholder.svg?height=200&width=200",
        onSale: false,
    },
    {
        id: 4,
        clave: '000012',
        brand: "MIRAGE",
        type: "Lavadora",
        descripcion: "Lavadora Aqua Saving 19 Kilos Samsung",
        codigo: "MLV-1200",
        precio1: 5499.0,
        precio2: 6999.0,
        image: "/placeholder.svg?height=200&width=200",
        onSale: true,
    },
    {
        id: 5,
        clave: '000012',
        brand: "LG",
        type: "Lavadora",
        descripcion: "Lavadora Aqua Saving 19 Kilos Samsung",
        codigo: "WT20BSS",
        precio1: 9999.0,
        precio2: 12999.0,
        image: "/placeholder.svg?height=200&width=200",
        onSale: false,
    },
    {
        id: 6,
        clave: '000012',
        brand: "MIRAGE",
        type: "Lavadora",
        descripcion: "Lavadora Aqua Saving 19 Kilos Samsung",
        codigo: "MLV-1000",
        precio1: 4499.0,
        precio2: 5999.0,
        image: "/placeholder.svg?height=200&width=200",
        onSale: true,
    },
]

export default async function LineasPage(params: { params: { categoriaName: string, lineaName: string, lineaId: string } }) {
    const { categoriaName, lineaName, lineaId } = await params.params;

    const lineaProducts = await getLineasProduct(lineaId);
    const products = adaptProducts(lineaProducts?.articulos);
    console.log("Linea Products:", lineaProducts?.marca);
    console.log("Products:", products.length);


    return <ProductGrid title={slugATexto(lineaName)} products={products} Breadcrumb={[{ title: categoriaName, link: "/" }, { title: lineaName, link: '#' }]} />
}