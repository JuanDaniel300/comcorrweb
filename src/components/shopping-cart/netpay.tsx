"use client";

import { useState, useEffect } from "react";
import { CreditCard } from "lucide-react";

import CheckoutLoading from "./checkout";

export default function CheckoutNetPay() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Simular carga inicial al entrar a la página
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 4000); // 4 segundos de carga inicial

    return () => clearTimeout(timer);
  }, []);

  // const handleFinalizarCompra = () => {
  //   // Aquí se abriría el modal de NetPay
  //   console.log("Abriendo modal de NetPay...");
  // };

  // Mostrar loader inicial
  if (isInitialLoading) {
    return <CheckoutLoading isVisible={true} />;
  }

  return (
    <div className="w-full">
      <div className="">
        {/* Método de Pago */}
        <div className="">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b">
              <h1 className="text-2xl font-semibold text-primario">
                Pago Seguro con NetPay
              </h1>
              <p className="text-gray-600 mt-2">
                Tu información está protegida con encriptación de nivel bancario
              </p>
            </div>

            <div className="p-6">
              {/* NetPay - Información */}
              <div className="space-y-6">
                <div className="border-2 border-primario rounded-lg bg-blue-50 p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-primario rounded-lg flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-primario">
                        NetPay - Pago Seguro
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Procesador de pagos líder con tecnología de seguridad
                        avanzada
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-white rounded-lg p-3 border border-blue-200">
                      <div className="text-xs text-gray-600 mb-1">
                        Tarjetas Aceptadas
                      </div>
                      <div className="text-sm font-medium text-primario">
                        Visa, MasterCard, AMEX
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-blue-200">
                      <div className="text-xs text-gray-600 mb-1">
                        Procesamiento
                      </div>
                      <div className="text-sm font-medium text-primario">
                        Instantáneo y Seguro
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <div className="flex items-center space-x-2 text-primario mb-2">
                      <CreditCard className="h-4 w-4" />
                      <span className="font-medium text-sm">
                        Características de Seguridad
                      </span>
                    </div>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Encriptación SSL de 256 bits</li>
                      <li>• Cumplimiento PCI DSS Level 1</li>
                      <li>• Protección contra fraude en tiempo real</li>
                      <li>• Verificación 3D Secure</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-white">✓</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-green-900">
                        Listo para procesar
                      </h4>
                      <p className="text-xs text-green-700 mt-1">
                        Tu pedido está listo. Al hacer clic en Pagar con NetPay,
                        se abrirá una ventana segura para completar tu pago.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
