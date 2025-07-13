import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../styles/main.css";
import { Toaster } from "react-hot-toast";

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
import SessionProviderClient from "@/providers/SessionProviderClient";
import { ToastProvider } from "@/providers/ToastProviderClient";
import Script from "next/script";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_API_KEY_GOOGLE}`}
          strategy="beforeInteractive"
          id="google-maps-script"
        />
      </head>
      <body className={montserrat.className}>
        <SessionProviderClient>
          <ToastProvider>
            <div>
              <Toaster />
            </div>

            {children}
          </ToastProvider>
        </SessionProviderClient>
      </body>
    </html>
  );
}
