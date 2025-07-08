"use client";
import { Fragment, Suspense } from "react";
import Navbar from "@/components/navbar/navbar.component";
import NavbarCategories from "@/components/navabar-categories";
import NavbarCategoriesSkeleton from "@/components/navabar-categories/Skeleton";
import { useIsMobile } from "@/hooks/useMobile";
import NavbarMobile from "./mobile/navbarMobile";

interface Props {
  session: any;
}

export default function ClientNavbarSwitcher({ session }: Props) {
  const isMobile = useIsMobile();

  return (
    <div className="fixed w-full z-50">
      {isMobile ? (
        <Fragment>
          <NavbarMobile />
        </Fragment>
      ) : (
        <Fragment>
          <Navbar session={session} />
          <Suspense fallback={<NavbarCategoriesSkeleton />}>
            <NavbarCategories />
          </Suspense>
        </Fragment>
      )}
    </div>
  );
}
