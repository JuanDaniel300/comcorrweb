"use client";

import { IoIosArrowDown } from "react-icons/io";
import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { capitalize, generarSlug } from "@/utils/generic";
import "./styles.css";
import Link from "next/link";

interface Subcategory {
  nombre: string;
  id: string;
}

interface Category {
  id: string;
  nombre: string;
  lineas: Subcategory[];
}

interface NavbarCategoriesClientProps {
  categorias: Category[];
}

export default function NavbarCategoriesClient({
  categorias,
}: NavbarCategoriesClientProps) {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const menuRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleToggle = (categoryName: string) => {
    setOpenCategory((prev) => (prev === categoryName ? null : categoryName));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isClickInsideMenu = Object.values(menuRefs.current).some(
        (ref) => ref && ref.contains(event.target as Node)
      );

      if (!isClickInsideMenu) {
        setOpenCategory(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setOpenCategory(null);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="w-full bg-navbarCategories">
      <div className="container  text-white mx-auto flex justify-between py-3">
        {categorias.map((category: Category) => (
          <div
            key={category.nombre}
            className="relative"
            ref={(el) => {
              menuRefs.current[category.nombre] = el;
            }}
          >
            {/* Categoría principal */}
            <div
              className="font-[500] flex items-center gap-2 text-sm cursor-pointer"
              onClick={() => handleToggle(category.nombre)}
            >
              <span>{capitalize(category.nombre)}</span>
              <motion.div
                animate={{
                  rotate: openCategory === category.nombre ? 180 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <IoIosArrowDown />
              </motion.div>
            </div>

            {/* Subcategorías con animación */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: openCategory === category.nombre ? "auto" : 0,
                opacity: openCategory === category.nombre ? 1 : 0,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute left-0 mt-3 bg-white border border-gray-200 text-black rounded-b-lg shadow-lg overflow-hidden w-40"
            >
              {category.lineas.map((sub: Subcategory, index: number) => (
                <Link
                  href={`/c/${generarSlug(
                    `${category.nombre}-${category.id}`
                  )}/${generarSlug(`${sub.nombre}-${sub.id}`)}`}
                  key={index}
                  onClick={() => handleToggle(category.nombre)}
                >
                  <div className="px-4 py-2 text-sm font-semibold  hover:text-red-700 cursor-pointer">
                    {capitalize(sub.nombre)}
                  </div>
                </Link>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
