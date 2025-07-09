"use client";

import { capitalize } from "@/utils/generic";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiChevronDown, BiLogOut, BiUser, BiUserCircle } from "react-icons/bi";
import { Session } from "next-auth";

interface ProfileLinkProps {
  user: Session;
  className?: string;
}

export default function ProfileButton({
  user,
  className = "",
}: ProfileLinkProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // const signOut = useSignOut();

  const logoutRequest = async () => {
    localStorage.clear();

    signOut({
      callbackUrl: "/",
    });
  };

  // Manejador para clicks fuera del componente
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const options = [
    {
      icon: <BiUserCircle />,
      label: "Informacion de perfil",
      href: "/profile",
    },
    {
      icon: <AiOutlineShoppingCart />,
      label: "Mis pedidos",
      href: "/profile/orders",
    },
    { icon: <BiLogOut />, label: "Cerrar Sesión", handler: logoutRequest },
  ];

  return (
    <div
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div
        className={`relative overflow-hidden px-4 py-2 rounded-lg flex items-center gap-3 hover:text-white font-medium transition-all duration-300
        before:absolute before:top-0 before:left-0 before:w-0 before:h-full before:bg-blue-800 before:transition-all before:duration-300 hover:before:w-full cursor-pointer ${className}`}
      >
        <BiUser className="relative z-10 w-5 h-5" />
        <span className="relative z-10">
          {capitalize(user.user?.name ?? "")}
        </span>
        <BiChevronDown
          className={`relative z-10 w-4 h-4 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {isOpen && (
        <div className="absolute  top-full left-0 mt-0 w-max border border-gray-200 bg-white rounded-lg shadow-lg overflow-hidden z-50 animate-in fade-in slide-in-from-top-5 duration-300">
          {/* Añadimos un "puente" invisible para evitar que se pierda el hover */}
          <div className="h-2 bg-transparent"></div>
          <div className="w-full">
            {options.map((option, index) => (
              <Link
                key={index}
                href={option.href || "#"}
                onClick={option.handler}
                className="flex items-center gap-2 px-4 py-2 text-sm font-[500] hover:text-[#e12424]"
              >
                <span className="">{option.icon}</span>
                {option.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
