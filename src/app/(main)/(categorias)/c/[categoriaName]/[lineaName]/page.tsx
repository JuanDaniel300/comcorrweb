import { adaptProducts } from "@/adapters/productAdapter";
import ProductGrid from "@/components/productGrid/ProductGrid";
import { getLineasProduct } from "@/services/lineas/lineas";
import { Product } from "@/types/product.type";
import { capitalize, slugATexto } from "@/utils/generic";

type Params = Promise<{
  categoriaName: string;
  lineaName: string;
  page: string;
}>;

type SearchParams = Promise<{
  page: string;
}>;

export default async function LineasPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const params = await props.params;
  const { categoriaName, lineaName } = params;

  const SearchParamsAwait = await props.searchParams;
  const { page = "1" } = SearchParamsAwait;

  const categoriaTitle = capitalize(
    categoriaName.split("-").slice(0, -1).join("-")
  );

  const lineaTitle = capitalize(lineaName.split("-").slice(0, -1).join("-"));
  const lineaId = lineaName.split("-").pop() as string;

  const lineaProducts = await getLineasProduct(lineaId, page);
  const products: Product[] = adaptProducts(lineaProducts?.articulos);

  return (
    <ProductGrid
      key={lineaId + page}
      title={slugATexto(lineaTitle)}
      totalPages={lineaProducts?.totalPages}
      products={products}
      loading={false}
      Breadcrumb={[
        {
          title: slugATexto(categoriaTitle),
          link: `/c/${categoriaName}`,
        },
        { title: lineaTitle, link: "#" },
      ]}
    />
  );
}
