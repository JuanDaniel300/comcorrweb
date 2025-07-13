"use client";

import "./navbar.component.css";
import { BiUser } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { motion } from "framer-motion";
import Link from "next/link";
import SearchBar from "../searchBar/SearchBar";
import { useCartStore } from "@/stores/cartStore";
import { useEffect, useState } from "react";
import ProfileButton from "../profile/profileButton";
import { Session } from "next-auth";

const Navbar = ({ session }: { session: Session }) => {
  const cart = useCartStore((state) => state.cart);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="w-full bg-nav">
      <div className="container mx-auto py-5 flex items-center">
        {/* Logo */}
        <motion.div
          whileHover={{
            rotateZ: [-3, 3, -3],
            transition: {
              repeat: Infinity,
              duration: 0.3,
              ease: "easeInOut",
            },
          }}
          className="flex items-center w-max me-auto"
        >
          <Link href="/">
            <img src="/logo.svg" className="object-cover" alt="Logo" />
          </Link>
        </motion.div>

        {/* Search */}
        <div className="lg:flex items-center me-10">
          <SearchBar />
        </div>

        {/* NavbarItems */}
        <div className="navbarItems flex w-max gap-5 items-center">
          {session ? <ProfileButton user={session} /> : <LoginButton />}
          <Link
            href="/Shopping-cart"
            className="Carrito flex items-center gap-3 cursor-pointer"
          >
            <motion.div
              whileHover={{
                rotateZ: [-3, 3, -3],
                transition: {
                  repeat: Infinity,
                  duration: 0.3,
                  ease: "easeInOut",
                },
              }}
            >
              <AiOutlineShoppingCart size={25} />
            </motion.div>
            <span>Carrito</span>
            <span className="cartCount rounded-full bg-cartCount text-white px-2 py-1 text-sm">
              {hasMounted && totalItems}
            </span>
          </Link>
        </div>
      </div>
    </div >
  );
};

export const LoginButton = () => {
  return (
    <Link
      href="/Login"
      className="relative overflow-hidden px-4 py-2 rounded-lg flex items-center gap-3 hover:text-white font-medium transition-all duration-300
      before:absolute before:top-0 before:left-0 before:w-0 before:h-full before:bg-blue-800 before:transition-all before:duration-300 hover:before:w-full"
    >
      <BiUser className="relative z-10" size={25} />
      <span className="relative z-10">Iniciar sesión</span>
    </Link>
  );
};

export default Navbar;
