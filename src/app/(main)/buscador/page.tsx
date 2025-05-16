"use client";

import { getArticulosBySearch } from "@/services/articulos/articulos";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BuscadorPage() {
  const [articulos, setArticulos] = useState<any[]>([]);
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
  }, [q]);

  if (!q) {
    return <div>Por favor, ingresa un término de búsqueda.</div>;
  }

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (articulos.length === 0) {
    return <div>No se encontraron resultados para "{q}".</div>;
  }

  console.log("Articulos:", articulos);

  return <div></div>;
}
