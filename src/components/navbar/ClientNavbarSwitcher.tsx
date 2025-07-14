"use client";

import { Fragment, useState } from "react";
import Navbar from "@/components/navbar/navbar.component";
import { useIsMobile } from "@/hooks/useMobile";
import NavbarMobile from "./mobile/navbarMobile";
import { Session } from "next-auth";
import MobileSidebar from "../sidebar/sidebarMobile";

export default function ClientNavbarSwitcher({
  session,
}: {
  session: Session;
}) {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Fragment>
      {isMobile ? (
        <Fragment>
          <NavbarMobile toggleSidebar={toggleSidebar} />
          <MobileSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        </Fragment>
      ) : (
        <Fragment>
          <Navbar session={session} />
        </Fragment>
      )}
    </Fragment>
  );
}
