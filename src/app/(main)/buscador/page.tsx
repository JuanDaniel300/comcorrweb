"use client";

import { Product } from "@/adapters/productAdapter";
import ProductGrid from "@/components/productGrid/ProductGrid";
import { getArticulosBySearch } from "@/services/articulos/articulos";
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
    return <div>Por favor, ingresa un término de búsqueda.</div>;
  }

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (articulos?.articulos.length === 0) {
    return <div>No se encontraron resultados para "{q}".</div>;
  }

  return (
    <ProductGrid
      title={`Resultados para "${q}"`}
      products={articulos?.articulos}
      Breadcrumb={[{ title: q, link: "#" }]}
    />
  );
}
