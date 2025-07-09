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

export default async function LineasPage(props: { params: Params }) {
  const params = await props.params;
  const { categoriaName, lineaName, page = "1" } = params;

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
