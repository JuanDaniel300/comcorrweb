import Footer from "@/components/footer/footer.component";
import Navbar from "@/components/navbar/navbar.component";
import NavbarCategories from "@/components/navabar-categories";
import { Suspense } from "react";
import NavbarCategoriesSkeleton from "@/components/navabar-categories/Skeleton";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="fixed w-full z-50">
        <Navbar />

        <Suspense fallback={<NavbarCategoriesSkeleton />}>
          <NavbarCategories />
        </Suspense>
      </div>
      <div className="min-h-screen  padding-top">{children}</div>
      <Footer />
    </div>
  );
}
