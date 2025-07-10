"use client";

import { Fragment, Suspense } from "react";
import Navbar from "@/components/navbar/navbar.component";
import { useIsMobile } from "@/hooks/useMobile";
import NavbarMobile from "./mobile/navbarMobile";
import { Session } from "next-auth";


export default function ClientNavbarSwitcher({
  session,
}: {
  session: Session;
}) {
  const isMobile = useIsMobile();

  return (
    <Fragment>
      {isMobile ? (
        <Fragment>
          <NavbarMobile />
        </Fragment>
      ) : (
        <Fragment>
          <Navbar session={session} />


        </Fragment>
      )}
    </Fragment>

  );
}
