import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../styles/main.css";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import GuestLogin from "@/components/auth/GuestLogin";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["200", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "ComcorrWeb",
  description: "Ecommerce comcorrweb lideres en linea blanca",
};

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <body className={montserrat.className}>
        {!session && <GuestLogin />}
        {children}
      </body>
    </html>
  );
}
