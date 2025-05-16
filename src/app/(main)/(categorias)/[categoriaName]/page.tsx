import { adaptProducts } from "@/adapters/productAdapter";
import ProductGrid from "@/components/productGrid/ProductGrid";
import { getCategoriasById } from "@/services/categorias/categorias";
import { capitalize, slugATexto } from "@/utils/generic";

export default async function CategoriaPage(params: {
  params: { categoriaName: string };
}) {
  const { categoriaName } = await params.params;

  const categoriaTitle = capitalize(
    categoriaName.split("-").slice(0, -1).join("-")
  );
  const categoriaId = categoriaName.split("-").pop() as string;

  const categoryProducts = await getCategoriasById(categoriaId);
  const products = adaptProducts(categoryProducts?.articulos);

  return (
    <ProductGrid
      title={slugATexto(categoriaTitle)}
      products={products}
      Breadcrumb={[{ title: slugATexto(categoriaTitle), link: "#" }]}
    />
  );
}
