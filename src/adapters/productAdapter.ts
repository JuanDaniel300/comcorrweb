// lib/adapters/productAdapter.ts

export type Product = {
  clave: string;
  descripcion: string;
  precio1: number;
  precio2: number;
  imagen1?: string | null;
  imagen2?: string | null;
  imagen3?: string | null;
  existencia: number;
  linea: string;
  marca: string;
  categoria: string;
  codigo: string;
};

export type AdaptedProduct = {
  clave: string;
  descripcion: string;
  precio1: number;
  precio2: number;
  imagen1: string | false;
  imagen2: string | false;
  imagen3: string | false;
  existencia: number;
  linea: string;
  marca: string;
  categoria: string;
  codigo: string;
};

const BASE_IMAGE_URL = "http://18.191.238.226:3000/";

export function adaptProducts(rawProducts: Product[] = []): AdaptedProduct[] {
  return rawProducts.map((product) => ({
    clave: product.clave,
    descripcion: product.descripcion,
    precio1: product.precio1,
    precio2: product.precio2,
    imagen1: product.imagen1 ? BASE_IMAGE_URL + product.imagen1 : false,
    imagen2: product.imagen2 ? BASE_IMAGE_URL + product.imagen2 : false,
    imagen3: product.imagen3 ? BASE_IMAGE_URL + product.imagen3 : false,
    existencia: product.existencia,
    linea: product.linea,
    marca: product.marca,
    categoria: product.categoria,
    codigo: product.codigo,
  }));
}
