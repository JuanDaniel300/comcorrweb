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

  useEffect(() => {
    const fetchArticulos = async () => {
      if (q) {
        try {
          setLoading(true);
          const data = await getArticulosBySearch(q);
          setArticulos(data);
        } catch (error) {
          console.error("Error fetching articulos:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchArticulos();
  }, [JSON.stringify(q)]);

  if (!q) {
    return <div className="padding-top">Por favor, ingresa un término de búsqueda.</div>;
  }

  if (loading) {
    return <div className="padding-top">Cargando...</div>;
  }



  return (
    <ProductGrid
      title={`Resultados para "${q}"`}
      products={articulos?.articulos as Product[]}
      loading={loading}
      Breadcrumb={[{ title: q, link: "#" }]}
    />
  );
}
