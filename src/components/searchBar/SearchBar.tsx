"use client";
import { IoSearch } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function SearchBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const handleClickOutside = (event: any) => {
        if (isOpen && !event?.target?.closest(".search-bar")) {
            setIsOpen(false);
        }
    }

    return (
        <div className="relative w-full">
            <div
                onClick={() => setIsOpen(true)}
                onBlur={handleClickOutside}
                className={`cursor-pointer w-full flex items-center space-x-2 hover:bg-gray-200 px-4 py-2 rounded-full transition-colors duration-200 ${isOpen && "bg-gray-200"}`}
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
