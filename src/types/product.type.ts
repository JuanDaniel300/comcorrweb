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
  quantity?: number;
};
