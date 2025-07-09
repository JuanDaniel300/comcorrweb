import { adaptProducts } from "@/adapters/productAdapter";
import ProductGrid from "@/components/productGrid/ProductGrid";
import { getCategoriasById } from "@/services/categorias/categorias";
import { Product } from "@/types/product.type";
import { capitalize, slugATexto } from "@/utils/generic";

type Params = Promise<{
  categoriaName: string;
  page: string;
}>;

type SearchParams = Promise<{
  page: string;
}>;
export default async function CategoriaPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const params = await props.params;
  const { categoriaName } = params;

  const SearchParamsAwait = await props.searchParams;
  const { page = "1" } = SearchParamsAwait;

  console.log(page);

  const categoriaTitle = capitalize(
    categoriaName.split("-").slice(0, -1).join("-")
  );
  const categoriaId = categoriaName.split("-").pop() as string;

  console.log({ page });

  const categoryProducts = await getCategoriasById(categoriaId, page);
  const products: Product[] = adaptProducts(categoryProducts?.articulos);

  console.log({ products: categoryProducts?.articulos });

  return (
    <ProductGrid
      key={page}
      title={slugATexto(categoriaTitle)}
      products={products}
      totalPages={categoryProducts?.totalPages}
      loading={false}
      Breadcrumb={[{ title: slugATexto(categoriaTitle), link: "#" }]}
    />
  );
}
