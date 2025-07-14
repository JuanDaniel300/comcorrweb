"use client";

import Link from "next/link";
import {
  ShoppingCart,
  User,
  MapPin,
  Shield,
  HelpCircle,
  FileTypeIcon as FileTerms,
  LogOut,
} from "lucide-react";
import { motion } from "motion/react";
import { useSession, signOut } from "next-auth/react";
import { capitalize } from "@/utils/generic";
import { usePathname } from "next/navigation";

export default function MiCuentaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const pathname = usePathname();

  // exact=true => solo match exacto; exact=false => match exacto o subruta
  const isActive = (href: string, exact = false) =>
    exact
      ? pathname === href
      : pathname === href || pathname.startsWith(href + "/");

  const linkClasses = (href: string, exact = false) =>
    `flex items-center py-2 px-3 rounded-md ${
      {
        true: "bg-[var(--claro2)] font-semibold text-primario",
        false: "text-[var(--oscuro1)] hover:bg-[var(--claro2)]",
      }[isActive(href, exact).toString()]
    }`;

  return (
    <div className="min-h-screen bg-gray-100 sm:p-4 padding-top">
      <div className="container mx-auto py-10">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <aside className="w-full sm:w-80 border-r border-gray-300 min-h-screen pe-6 py-6 hidden sm:block">
            <div className="mb-8">
              <Link href="/profile">
                <h1 className="text-2xl hover:underline font-semibold text-[var(--oscuro1)]">
                  Hola, {capitalize(session?.user?.name as string) ?? "User"}
                </h1>
              </Link>
              <p className="text-[var(--oscuro2)] text-sm">
                Gracias por ser parte de{" "}
                <span className="text-primario font-bold">Comcorr</span>.
              </p>
            </div>

            <nav className="space-y-6">
              {/* Pedidos y Pagos */}
              <div className="space-y-2">
                <Link
                  href="/profile/orders"
                  className={linkClasses("/profile/orders")}
                >
                  <ShoppingCart size={18} className="mr-3" />
                  <span>Pedidos</span>
                </Link>
                {/* <Link
                                    href="/profile/pagos"
                                    className={linkClasses("/profile/pagos")}
                                >
                                    <CreditCard size={18} className="mr-3" />
                                    <span>Pago</span>
                                </Link> */}
              </div>

              {/* Administrar cuenta */}
              <div>
                <h3 className="font-medium text-[var(--oscuro1)] mb-2">
                  Administrar cuenta
                </h3>
                <div className="space-y-2">
                  <Link
                    href="/profile"
                    className={linkClasses("/profile", true)}
                  >
                    <User size={18} className="mr-3" />
                    <span>Información personal</span>
                  </Link>
                  <Link
                    href="/profile/direcciones"
                    className={linkClasses("/mi-cuenta/direcciones")}
                  >
                    <MapPin size={18} className="mr-3" />
                    <span>Direcciones</span>
                  </Link>
                </div>
              </div>

              {/* Privacidad */}
              <div>
                <h3 className="font-medium text-[var(--oscuro1)] mb-2">
                  Privacidad
                </h3>
                <div className="space-y-2">
                  <Link
                    href="/mi-cuenta/aviso-privacidad"
                    className={linkClasses("/mi-cuenta/aviso-privacidad", true)}
                  >
                    <Shield size={18} className="mr-3" />
                    <span>Aviso de Privacidad Integral</span>
                  </Link>
                </div>
              </div>

              {/* Servicio al cliente */}
              <div>
                <h3 className="font-medium text-[var(--oscuro1)] mb-2">
                  Servicio al cliente
                </h3>
                <div className="space-y-2">
                  <Link
                    href="/mi-cuenta/ayuda"
                    className={linkClasses("/mi-cuenta/ayuda")}
                  >
                    <HelpCircle size={18} className="mr-3" />
                    <span>Ayuda</span>
                  </Link>
                  <Link
                    href="/mi-cuenta/terminos"
                    className={linkClasses("/mi-cuenta/terminos", true)}
                  >
                    <FileTerms size={18} className="mr-3" />
                    <span>Términos y condiciones</span>
                  </Link>
                </div>
              </div>

              {/* Cerrar sesión */}
              <div className="pt-4 border-t border-gray-300">
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex items-center py-2 px-3 text-[var(--principal)] hover:bg-[var(--claro2)] rounded-md w-full text-left"
                >
                  <LogOut size={18} className="mr-3" />
                  <span>Cerrar sesión</span>
                </button>
              </div>
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 px-5 sm:p-6">{children}</main>

          {/* Chat button */}
          <div className="fixed bottom-6 right-6">
            <motion.button
              whileHover={{ scale: 1.4 }}
              className="bg-primario cursor-pointer text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
