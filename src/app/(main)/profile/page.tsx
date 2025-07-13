"use client";
import Breadcrumbs from "@/components/Breadcrumbs/breadCrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronRight, Mail, Phone, User } from "lucide-react";
import { motion } from "motion/react";
export default function PageView() {
  return (
    <div>
      {/* Breadcrums */}
      <div className="w-full mb-5">
        <Breadcrumbs
          Breadcrumbs={[
            { title: "Perfil", link: "" },
          ]}
        />
      </div>
      <h1 className="font-semibold text-3xl mb-5">Te damos la bienvenida a tu cuenta</h1>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="shadow-none">
          <CardContent className="p-6 shadow-none">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <User className="w-6 h-6 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">Información de la cuenta</h2>
              </div>
              <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
                Editar información
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            <p className="text-gray-600 text-sm mb-6">Direcciones, información de contacto y contraseña</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Correo electrónico
                </label>
                <Input type="email" value="juan.daniel@email.com" readOnly className="bg-gray-50" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Número telefónico
                </label>
                <Input type="tel" value="+52 555 123 4567" readOnly className="bg-gray-50" />
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Contraseña</h3>
                  <p className="text-sm text-gray-600">Última actualización hace 3 meses</p>
                </div>
                <Button variant="outline" size="sm">
                  Cambiar contraseña
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
