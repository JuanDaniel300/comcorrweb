import { adaptProducts } from "@/adapters/productAdapter";
import ProductGrid from "@/components/productGrid/ProductGrid";
import { getLineasProduct } from "@/services/lineas/lineas";
import { Product } from "@/types/product.type";
import { capitalize, slugATexto } from "@/utils/generic";

export default async function LineasPage({
  params,
  searchParams,
}: {
  params: { categoriaName: string, lineaName: string };
  searchParams: { page?: string };
}) {
  const { categoriaName, lineaName } = await params;
  const { page = "1" } = await searchParams;

  const categoriaTitle = capitalize(
    categoriaName.split("-").slice(0, -1).join("-")
  );

  const lineaTitle = capitalize(lineaName.split("-").slice(0, -1).join("-"));
  const lineaId = lineaName.split("-").pop() as string;

  const lineaProducts = await getLineasProduct(lineaId, page);
  const products = adaptProducts(lineaProducts?.articulos);

  return (
    <ProductGrid
      key={lineaId + page}
      title={slugATexto(lineaTitle)}
      totalPages={lineaProducts?.totalPages}
      products={products as Product[]}
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
