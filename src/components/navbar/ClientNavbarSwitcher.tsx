"use client";

import { Fragment } from "react";
import Navbar from "@/components/navbar/navbar.component";
import { useIsMobile } from "@/hooks/useMobile";
import NavbarMobile from "./mobile/navbarMobile";
import NavbarCategoriesSuspense from "../navabar-categories/navbarCategoriesSuspense";
import { Session } from "next-auth";

export default function ClientNavbarSwitcher({
  session,
}: {
  session: Session;
}) {
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
          <NavbarCategoriesSuspense />
        </Fragment>
      )}
    </div>
  );
}
