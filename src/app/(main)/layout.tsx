import Footer from "@/components/footer/footer.component";
import NextTopLoader from "nextjs-toploader";
import { getServerSession } from "next-auth";
import { authOptionsUtils } from "@/lib/session";
import ClientNavbarSwitcher from "@/components/navbar/ClientNavbarSwitcher";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptionsUtils);

  return (
    <div>
      <ClientNavbarSwitcher session={session} />
      <NextTopLoader color="#02308e" />

      <div className="min-h-screen  padding-top">{children}</div>
      <Footer />
    </div>
  );
}
