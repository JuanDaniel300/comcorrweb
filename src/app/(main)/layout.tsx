import Footer from "@/components/footer/footer.component";
import NextTopLoader from "nextjs-toploader";
import { getServerSession } from "next-auth";
import { authOptionsUtils } from "@/lib/session";
import ClientNavbarSwitcher from "@/components/navbar/ClientNavbarSwitcher";
import { Session } from "next-auth";
import NavbarCategories from "@/components/navabar-categories";
import NavbarCategoriesSkeleton from "@/components/navabar-categories/Skeleton";
import { Suspense } from "react";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptionsUtils);

  return (
    <div>
      <div className="fixed w-full z-50">

        <ClientNavbarSwitcher session={session as Session} />

        <Suspense fallback={<NavbarCategoriesSkeleton />}>
          <NavbarCategories />
        </Suspense>
      </div>

      <NextTopLoader color="#02308e" />

      <div className="min-h-screen  padding-top">{children}</div>
      <Footer />
    </div>
  );
}
