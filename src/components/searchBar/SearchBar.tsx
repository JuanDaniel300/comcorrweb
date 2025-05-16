"use client";
import { IoSearch } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation"; // 👈 importa el router

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter(); // 👈 hook para navegar

  const handleClickOutside = (event: any) => {
    if (isOpen && !event?.target?.closest(".search-bar")) {
      setIsOpen(false);
    }
  };

  const handlerKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
    if (event.key === "Enter" && searchTerm.trim() !== "") {
      router.push(`/buscador?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="relative w-full search-bar">
      <div
        onClick={() => setIsOpen(true)}
        onBlur={handleClickOutside}
        className={`cursor-pointer w-full flex items-center space-x-2 hover:bg-gray-200 px-4 py-2 rounded-full transition-colors duration-200 ${
          isOpen && "bg-gray-200"
        }`}
      >
        <IoSearch size={20} className="text-black" />
        <AnimatePresence>
          {isOpen && (
            <motion.input
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "450px", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handlerKeyDown}
              type="text"
              autoFocus
              placeholder="Buscar..."
              className="bg-transparent focus:outline-none text-sm"
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
