import { Suspense } from "react";
import NavbarCategoriesClient from "./NavbarCategoriesClient";
import cache from "memory-cache";
import { getCategorias } from "@/services/home/categorias/categorias";
import NavbarCategoriesSkeleton from "./Skeleton";

export default async function NavbarCategoriesServer() {
    let categories = cache.get("categorias");

    if (!categories) {
        categories = await getCategorias();

        cache.put("categorias", categories);
    }


    return (
        <Suspense fallback={<NavbarCategoriesSkeleton />}>
            <NavbarCategoriesClient categorias={categories} />
        </Suspense>
    )
}