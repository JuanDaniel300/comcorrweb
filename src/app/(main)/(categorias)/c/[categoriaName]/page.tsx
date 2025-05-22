import { adaptProducts } from "@/adapters/productAdapter";
import ProductGrid from "@/components/productGrid/ProductGrid";
import { getCategoriasById } from "@/services/categorias/categorias";
import { Product } from "@/types/product.type";
import { capitalize, slugATexto } from "@/utils/generic";

export default async function CategoriaPage({
  params,
  searchParams,
}: {
  params: { categoriaName: string };
  searchParams: { page?: string };
}) {
  const { categoriaName } = await params;
  const { page = "1" } = await searchParams;

  const categoriaTitle = capitalize(
    categoriaName.split("-").slice(0, -1).join("-")
  );
  const categoriaId = categoriaName.split("-").pop() as string;

  console.log({ page });

  const categoryProducts = await getCategoriasById(categoriaId, page);
  const products = adaptProducts(categoryProducts?.articulos);

  console.log({ products: categoryProducts?.articulos });

  return (
    <ProductGrid
      key={page}
      title={slugATexto(categoriaTitle)}
      products={products as Product[]}
      totalPages={categoryProducts?.totalPages}
      loading={false}
      Breadcrumb={[{ title: slugATexto(categoriaTitle), link: "#" }]}
    />
  );
}
