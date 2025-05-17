import { adaptProducts } from "@/adapters/productAdapter";
import ProductGrid from "@/components/productGrid/ProductGrid";
import { getPromocionalesById } from "@/services/promos/promocionales";
import { Product } from "@/types/product.type";
import { capitalize, slugATexto } from "@/utils/generic";

export default async function PromocionPage(params: {
  params: { promocion: string };
}) {
  const { promocion } = await params.params;

  const promocionTitle = capitalize(
    promocion.split("-").slice(0, -1).join("-")
  );
  const promocionId = promocion.split("-").pop() as string;

  const promocionProducts = await getPromocionalesById(promocionId);
  const products = adaptProducts(promocionProducts?.articulos);

  return (
    <ProductGrid
      title={slugATexto(promocionTitle)}
      products={products as Product[]}
      loading={false}
      Breadcrumb={[{ title: slugATexto(promocionTitle), link: "#" }]}
    />
  );
}
