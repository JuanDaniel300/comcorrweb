import { adaptProducts } from "@/adapters/productAdapter";
import ProductGrid from "@/components/productGrid/ProductGrid";
import { getLineasProduct } from "@/services/lineas/lineas";
import { capitalize, slugATexto } from "@/utils/generic";

export default async function LineasPage(params: {
  params: { categoriaName: string; lineaName: string };
}) {
  const { categoriaName, lineaName } = await params.params;

  const categoriaTitle = capitalize(
    categoriaName.split("-").slice(0, -1).join("-")
  );

  const lineaTitle = capitalize(lineaName.split("-").slice(0, -1).join("-"));
  const lineaId = lineaName.split("-").pop() as string;

  const lineaProducts = await getLineasProduct(lineaId);
  const products = adaptProducts(lineaProducts?.articulos);

  return (
    <ProductGrid
      title={slugATexto(lineaTitle)}
      products={products}
      Breadcrumb={[
        {
          title: slugATexto(categoriaTitle),
          link: `/${categoriaName}`,
        },
        { title: lineaTitle, link: "#" },
      ]}
    />
  );
}
