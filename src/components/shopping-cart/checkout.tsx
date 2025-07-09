"use client";

import { useEffect, useState } from "react";
import { Loader2, ShoppingCart, CreditCard } from "lucide-react";
import { checkout } from "@/services/checkout/checkout";

interface CheckoutLoadingProps {
  isVisible: boolean;
}

export default function CheckoutLoading({ isVisible }: CheckoutLoadingProps) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState(
    "Configurando el pago seguro para tu pedido"
  );

  useEffect(() => {
    if (!isVisible) {
      setProgress(0);
      return;
    }

    const fetchCheckoutStatus = async () => {
      try {
        setProgress(30);
        setLoadingText("Conectando con el servidor...");

        const response = await checkout();

        if (response) {
          setProgress(100);
          setLoadingText("Pago seguro configurado correctamente");
        } else {
          setLoadingText("Ocurrió un error al configurar el pago");
        }
      } catch (error) {
        setLoadingText("Ocurrió un error al configurar el pago");
        console.error(error);
      }
    };

    fetchCheckoutStatus();
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center max-w-md w-full mx-4">
        {/* Logo */}
        <div className="mb-8">
          <div className="text-4xl font-bold">
            <span className="text-primario">C</span>
            <span className="text-secundario">M</span>
            <span className="text-primario">corr</span>
          </div>
        </div>

        {/* Icono animado */}
        <div className="mb-6">
          <div className="relative inline-block">
            <ShoppingCart className="h-16 w-16 text-primario mx-auto" />
            <div className="absolute -top-2 -right-2 bg-primario rounded-full p-2">
              <CreditCard className="h-6 w-6 text-white" />
            </div>
            <Loader2 className="h-8 w-8 animate-spin text-secundario absolute -bottom-2 -right-2" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-primario mb-2">
          Preparando tu Checkout
        </h2>

        <p className="text-gray-600 mb-8"> Esto solo tomará unos segundos...</p>

        {/* Barra de progreso */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className="bg-gradient-to-r from-primario to-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-sm text-gray-500">{loadingText}</p>
      </div>
    </div>
  );
}
