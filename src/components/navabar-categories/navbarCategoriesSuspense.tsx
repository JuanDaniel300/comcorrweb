import { Suspense } from "react";
import NavbarCategoriesSkeleton from "./Skeleton";
import NavbarCategories from "@/components/navabar-categories";

export default function NavbarCategoriesSuspense() {
  return (
    <Suspense fallback={<NavbarCategoriesSkeleton />}>
      <NavbarCategories />
    </Suspense>
  );
}
