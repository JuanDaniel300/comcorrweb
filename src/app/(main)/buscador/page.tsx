"use client";

import ProductGrid from "@/components/productGrid/ProductGrid";
import { getArticulosBySearch } from "@/services/articulos/articulos";
import { Product } from "@/types/product.type";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export interface ArticulosResponse {
  success: boolean;
  page: number;
  limit: number;
  totalRecords: number;
  totalPages: number;
  articulos: Product[];
}

export default function BuscadorPage() {
  const [articulos, setArticulos] = useState<ArticulosResponse>();
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const page = searchParams.get("page") ? parseInt(searchParams.get("page") as string) : 1;

  useEffect(() => {
    console.log("fetched data on search : " + q + "on page: " + page)
    const fetchArticulos = async () => {
      if (q) {
        try {
          setLoading(true);
          const data = await getArticulosBySearch(q, page);
          setArticulos(data);
          console.log("total products to page: " + page)
        } catch (error) {
          console.error("Error fetching articulos:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchArticulos();
  }, [JSON.stringify(q), JSON.stringify(page)]);

  console.table(articulos)

  if (!q) {
    return <div className="padding-top">Por favor, ingresa un término de búsqueda.</div>;
  }

  if (loading) {
    return (
      <div>Cargando</div>
    )
  }

  return (
    <ProductGrid
      title={`Resultados para "${q}"`}
      products={articulos?.articulos as Product[]}
      totalPages={articulos?.totalPages}
      loading={loading}
      Breadcrumb={[{ title: q, link: "#" }]}
    />
  );
}
