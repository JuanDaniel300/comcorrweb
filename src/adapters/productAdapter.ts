// lib/adapters/productAdapter.ts

import { Product } from "@/types/product.type";

export type AdaptedProduct = {
  id: string;
  clave: string;
  descripcion: string;
  precio1: number;
  precio2: number;
  imagen1: string | null | undefined;
  imagen2: string | null | undefined;
  imagen3: string | null | undefined;
  existencia: number;
  linea: string;
  marca: string;
  categoria: string;
  codigo: string;
};

export function adaptProducts(rawProducts: Product[] = []): Product[] {
  return rawProducts.map((product) => ({
    id: product.id,
    clave: product.clave,
    descripcion: product.descripcion,
    precio1: product.precio1,
    precio2: product.precio2,
    imagen1: product.imagen1,
    imagen2: product.imagen2,
    imagen3: product.imagen3,
    existencia: product.existencia,
    linea: product.linea,
    marca: product.marca,
    categoria: product.categoria,
    codigo: product.codigo,
  }));
}
