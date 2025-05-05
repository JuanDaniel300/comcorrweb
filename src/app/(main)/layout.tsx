import Footer from "@/components/footer/footer.component";
import Navbar from "@/components/navbar/navbar.component";
import NavbarCategories from "@/components/navabar-categories";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="fixed w-full z-50">
        <Navbar />
        <NavbarCategories />
      </div>
      <div className="min-h-screen  padding-top">{children}</div>
      <Footer />
    </div>
  );
}
