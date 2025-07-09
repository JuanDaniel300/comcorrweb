import { adaptProducts } from "@/adapters/productAdapter";
import ProductGrid from "@/components/productGrid/ProductGrid";
import { getPromocionalesById } from "@/services/promos/promocionales";
import { Product } from "@/types/product.type";
import { capitalize, slugATexto } from "@/utils/generic";

type Params = Promise<{
  promocion: string;
}>;

export default async function PromocionPage(props: { params: Params }) {
  const params = await props.params;
  const { promocion } = params;

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
