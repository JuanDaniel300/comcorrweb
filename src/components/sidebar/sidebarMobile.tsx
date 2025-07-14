"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiX, HiChevronRight } from "react-icons/hi";
import { useSession } from "next-auth/react";
import { PersonStandingIcon } from "lucide-react";
import { BsPerson } from "react-icons/bs";
import Link from "next/link";

interface MenuItem {
  id: string;
  title: string;
  hasSubmenu?: boolean;
  submenuItems?: string[];
}

const menuItems: MenuItem[] = [
  {
    id: "promociones",
    title: "Promociones",
    hasSubmenu: true,
    submenuItems: ["Ofertas del día", "Descuentos especiales", "Liquidación"],
  },
  {
    id: "linea-blanca",
    title: "Línea Blanca",
    hasSubmenu: true,
    submenuItems: ["Refrigeradores", "Lavadoras", "Estufas", "Lavavajillas"],
  },
  {
    id: "electrodomesticos",
    title: "Electrodomésticos",
    hasSubmenu: true,
    submenuItems: ["Microondas", "Licuadoras", "Cafeteras", "Tostadores"],
  },
  {
    id: "aire-acondicionado",
    title: "Aire Acondicionado",
    hasSubmenu: true,
    submenuItems: ["Ventana", "Split", "Portátil", "Central"],
  },
  {
    id: "electronica",
    title: "Electrónica",
    hasSubmenu: true,
    submenuItems: ["TV", "Audio", "Computadoras", "Celulares"],
  },
  {
    id: "muebles",
    title: "Muebles",
    hasSubmenu: true,
    submenuItems: ["Sala", "Comedor", "Recámara", "Oficina"],
  },
];

export default function MobileSidebar({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const { data: session } = useSession();

  const toggleSubmenu = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const sidebarVariants = {
    closed: {
      x: -100,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const overlayVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div className="relative">
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            className="fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 overflow-y-auto"
          >
            {/* Sidebar Header */}
            <div className="bg-primario text-white px-4 py-6 flex items-center justify-between">
              {session?.user ? (
                <Link href="/profile" className="flex items-center gap-2">
                  <PersonStandingIcon className="w-6 h-6" />
                  <span className="text-sm font-semibold">
                    {session.user.name}
                  </span>
                </Link>
              ) : (
                <Link href="/Login" className="flex items-center gap-2">
                  <BsPerson className="w-6 h-6" />
                  <span className="text-sm font-semibold">Iniciar sesión</span>
                </Link>
              )}
              <button
                onClick={toggleSidebar}
                className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
                aria-label="Cerrar menú"
              >
                <HiX className="w-6 h-6" />
              </button>
            </div>

            {/* Menu Items */}
            <nav className="py-4">
              {menuItems.map((item) => (
                <div key={item.id} className="border-b border-gray-100">
                  <button
                    onClick={() => item.hasSubmenu && toggleSubmenu(item.id)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-gray-800 font-medium text-xs">
                      {item.title}
                    </span>
                    {item.hasSubmenu && (
                      <motion.div
                        animate={{
                          rotate: expandedItems.includes(item.id) ? 90 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <HiChevronRight className="w-5 h-5 " />
                      </motion.div>
                    )}
                  </button>

                  {/* Submenu */}
                  <AnimatePresence>
                    {item.hasSubmenu && expandedItems.includes(item.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden bg-gray-50"
                      >
                        {item.submenuItems?.map((subItem, index) => (
                          <button
                            key={index}
                            className="w-full text-left px-8 text-xs py-3  hover:bg-gray-100 hover:text-blue-600 transition-colors"
                            onClick={() => {
                              console.log(`Navegando a: ${subItem}`);
                              toggleSidebar();
                            }}
                          >
                            {subItem}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Sidebar Footer */}
            <div className="p-4 border-t border-gray-200 mt-auto">
              <div className="space-y-2">
                <button className="w-full text-left text-xs p-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                  Ayuda y Soporte
                </button>
                <button className="w-full text-left text-xs p-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                  Contacto
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
