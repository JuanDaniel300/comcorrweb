"use client";

import "./navbar.component.css";
import { IoSearch } from "react-icons/io5";
import { BiUser } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { motion } from "motion/react";
import Link from "next/link";
import SearchBar from "../searchBar/SearchBar";
import { useCartStore } from "@/stores/cartStore";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { getTotalItems } = useCartStore();
  const [hasMounted, setHasMounted] = useState(false);
  const { data: session, status } = useSession();

  console.log(session);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <div className="w-full bg-nav ">
      <div className="container   mx-auto  py-5 flex  items-center">
        {/* Logo */}
        <motion.div
          whileHover={{
            rotateZ: [-3, 3, -3], // Pequeña inclinación en diagonal
            transition: {
              repeat: Infinity,
              duration: 0.3,
              ease: "easeInOut",
            }, // Movimiento rápido pero sutil
          }}
          className="flex items-center w-max me-auto"
        >
          <Link href="/">
            <img src="/logo.svg" className="object-cover" alt="" />
          </Link>
        </motion.div>

        {/* Search */}
        <div className="lg:flex items-center  me-10 ">
          <SearchBar />
        </div>

        {/* NavbarItems */}
        <div className="navbarItems flex w-max  gap-5 items-center">
          {/* <div
            className="relative overflow-hidden px-4 py-2 rounded-lg flex items-center gap-3 hover:text-white font-medium transition-all duration-300
        before:absolute before:top-0 before:left-0 before:w-0 before:h-full before:bg-blue-800  before:transition-all before:duration-300 hover:before:w-full sobrenosotros cursor-pointer"
          >
            <span className="relative z-10">Sobre nosotros</span>
          </div> */}
          <Link
            href="/Login"
            className="relative overflow-hidden px-4 py-2 rounded-lg flex items-center gap-3 hover:text-white font-medium transition-all duration-300
     before:absolute before:top-0 before:left-0 before:w-0 before:h-full before:bg-blue-800  before:transition-all before:duration-300 hover:before:w-full"
          >
            <BiUser className=" relative z-10" size={25} />
            <span className=" relative z-10">Iniciar sesión</span>
          </Link>
          {/* {!isAuthenticated || user === null || user.type === "guest" ? (
                        <Link
                            to="/Login"
                            className="relative overflow-hidden px-4 py-2 rounded-lg flex items-center gap-3 hover:text-white font-medium transition-all duration-300
     before:absolute before:top-0 before:left-0 before:w-0 before:h-full before:bg-blue-800  before:transition-all before:duration-300 hover:before:w-full"
                        >
                            <BiUser className=" relative z-10" size={25} />
                            <span className=" relative z-10">Iniciar sesión</span>
                        </Link>
                    ) : (
                        <ProfileLink user={user?.user} />
                    )} */}

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
                }, // Movimiento rápido pero sutil
              }}
            >
              <AiOutlineShoppingCart size={25} />
            </motion.div>
            <span>Carrito</span>
            <span className="cartCount rounded-full bg-cartCount text-white px-2 py-1 text-sm">
              {hasMounted && getTotalItems()}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
