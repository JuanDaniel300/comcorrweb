import NavbarCategoriesClient from "./NavbarCategoriesClient";
import { getCategorias } from "@/services/categorias/categorias";

export default async function NavbarCategoriesServer() {
  const categories = await getCategorias();

  return <NavbarCategoriesClient categorias={categories?.categorias} />;
}
