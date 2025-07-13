"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  createDirection,
  DireccionType,
  getDirecciones,
} from "@/services/direcciones/direcciones";
import { IoIosHome } from "react-icons/io";
import toast from "react-hot-toast";
import { useAddressStore } from "@/stores/adressStore";
import LocationSearchInput from "../location/LocationSearchInput";

export default function AddressSelector() {
  const [addresses, setAddresses] = useState<DireccionType[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null
  );
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newAddress, setNewAddress] = useState<Partial<DireccionType>>({
    calle: "",
    numero: "",
    colonia: "",
    ciudad: "",
    estado: "",
    codigo_postal: "",
    referencias: "",
    latitud: 19.043403,
    longitud: -98.966772,
    predeterminado: false,
  });

  const fetchAddresses = async () => {
    setLoading(true);

    const direcciones = await getDirecciones();

    if (direcciones) {
      setAddresses(direcciones?.direcciones);

      setSelectedAddressId(useAddressStore.getState().selectedAddress);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleAddAddress = async () => {
    if (
      newAddress.calle &&
      newAddress.numero &&
      newAddress.colonia &&
      newAddress.ciudad &&
      newAddress.estado &&
      newAddress.codigo_postal
    ) {
      const address: DireccionType = {
        calle: newAddress.calle,
        numero: newAddress.numero,
        colonia: newAddress.colonia,
        ciudad: newAddress.ciudad,
        estado: newAddress.estado,
        codigo_postal: newAddress.codigo_postal,
        referencias: newAddress.referencias || "",
        latitud: newAddress.latitud || 19.043403,
        longitud: newAddress.longitud || -98.966772,
        predeterminado: newAddress.predeterminado || false,
      };

      const response = await createDirection(address);

      if (response) {
        fetchAddresses();
        toast.success("Direccion agregada exitosamente");
      }

      setShowAddForm(false);

      setNewAddress({
        calle: "",
        numero: "",
        colonia: "",
        ciudad: "",
        estado: "",
        codigo_postal: "",
        referencias: "",
        latitud: 19.043403,
        longitud: -98.966772,
        predeterminado: false,
      });
    }
  };

  const swiperStyles = `
  .address-swiper {
    padding: 10px 0 50px 0 !important;
  }
  
  .address-swiper .swiper-slide {
    height: auto !important;
  }
  
  .address-swiper .swiper-pagination {
    bottom: 10px !important;
  }
  
  .address-swiper .swiper-pagination-bullet {
    background: #cbd5e1 !important;
    opacity: 1 !important;
  }
  
  .address-swiper .swiper-pagination-bullet-active {
    background: #3b82f6 !important;
  }
  
  .swiper-button-prev-custom:hover,
  .swiper-button-next-custom:hover {
    transform: translateY(-50%) scale(1.05);
  }
`;

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-6 w-64"></div>
          <div className="flex gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-80 h-48 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto">


      {/* Swiper Carousel Container */}
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          navigation={{
            prevEl: ".swiper-button-prev-custom",
            nextEl: ".swiper-button-next-custom",
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
          className="address-swiper"
        >
          {/* Existing Addresses */}
          {addresses.map((address) => (
            <SwiperSlide key={address.id} className="pb-4">
              <motion.div
                className="w-full px-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className={`cursor-pointer transition-all duration-200 ${selectedAddressId === address.id
                    ? "ring-2 ring-blue-700 bg-blue-50 border-blue-200 shadow-lg"
                    : "hover:shadow-lg border-gray-200"
                    }`}
                  onClick={() => {
                    useAddressStore.setState({
                      selectedAddress: address.id ?? null,
                    });
                    setSelectedAddressId(address.id ?? null);
                  }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`p-2 rounded-full ${selectedAddressId === address.id
                          ? "bg-blue-700 text-white"
                          : "bg-gray-100 text-gray-600"
                          }`}
                      >
                        <IoIosHome />
                      </div>
                      <h3 className="font-semibold text-lg text-gray-800">
                        {address.calle} {address.numero}
                      </h3>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600">
                      <p className="font-medium text-gray-800">
                        {address.colonia}, {address.ciudad}
                      </p>
                      <p>
                        {address.estado} {address.codigo_postal}
                      </p>
                      {address.referencias && (
                        <p className="text-xs text-gray-500 italic">
                          {address.referencias}
                        </p>
                      )}
                    </div>

                    {selectedAddressId === address.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-4 p-2 bg-blue-100 rounded-lg text-center"
                      >
                        <span className="text-blue-700 font-medium text-sm">
                          ✓ Dirección seleccionada
                        </span>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </SwiperSlide>
          ))}

          {/* Add New Address Card */}
          <SwiperSlide className="pb-4">
            <motion.div
              className="w-full px-1"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className="cursor-pointer border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 hover:shadow-lg transition-all duration-200 h-full"
                onClick={() => setShowAddForm(true)}
              >
                <CardContent className="p-6 flex flex-col items-center justify-center h-full min-h-[200px]">
                  <div className="p-4 bg-gray-100 rounded-full mb-4">
                    <FaPlus className="w-6 h-6 text-gray-600" />
                  </div>
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">
                    Agregar nueva dirección
                  </h3>
                  <p className="text-sm text-gray-600 text-center">
                    Haz clic para agregar una nueva dirección de envío
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </SwiperSlide>
        </Swiper>

        {/* Custom Navigation Buttons */}
        <Button
          variant="outline"
          size="icon"
          className="swiper-button-prev-custom absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg hover:bg-gray-50"
        >
          <FaChevronLeft className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="swiper-button-next-custom absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg hover:bg-gray-50"
        >
          <FaChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <style jsx>{swiperStyles}</style>

      {/* Add Address Modal */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-modal flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">
                  Agregar nueva dirección
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowAddForm(false)}
                >
                  <FaTimes className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="autocomplete">Buscar dirección con Google</Label>
                  <LocationSearchInput
                    onSelect={(data) => {
                      setNewAddress((prev) => ({
                        ...prev,
                        ...data,
                      }));
                    }}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="calle">Calle</Label>
                  <Input
                    id="calle"
                    placeholder="Ej: Av. Revolución"
                    value={newAddress.calle}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, calle: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="numero">Número</Label>
                  <Input
                    id="numero"
                    placeholder="Ej: 123"
                    value={newAddress.numero}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, numero: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="colonia">Colonia</Label>
                  <Input
                    id="colonia"
                    placeholder="Ej: Del Valle"
                    value={newAddress.colonia}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, colonia: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="ciudad">Ciudad</Label>
                  <Input
                    id="ciudad"
                    placeholder="Ej: Ciudad de México"
                    value={newAddress.ciudad}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, ciudad: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="estado">Estado</Label>
                  <Input
                    id="estado"
                    placeholder="Ej: CDMX"
                    value={newAddress.estado}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, estado: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="codigo_postal">Código Postal</Label>
                  <Input
                    id="codigo_postal"
                    placeholder="Ej: 06700"
                    value={newAddress.codigo_postal}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        codigo_postal: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="referencias">Referencias adicionales</Label>
                  <Textarea
                    id="referencias"
                    placeholder="Ej: Casa azul, portón negro, entre calles..."
                    value={newAddress.referencias}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        referencias: e.target.value,
                      })
                    }
                    rows={3}
                  />
                </div>

                <div className="">
                  <Input
                    id="latitud"
                    placeholder="Ej: 19.4326"
                    type="hidden"
                    value={newAddress.latitud}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        latitud: parseFloat(e.target.value),
                      })
                    }
                  />
                </div>

                <div className="">
                  <Input
                    id="longitud"
                    placeholder="Ej: -99.1332"
                    type="hidden"
                    value={newAddress.longitud}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        longitud: parseFloat(e.target.value),
                      })
                    }
                  />
                </div>

                <div className="flex items-center gap-2 md:col-span-2">
                  <input
                    type="checkbox"
                    id="predeterminado"
                    checked={newAddress.predeterminado}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        predeterminado: e.target.checked,
                      })
                    }
                  />
                  <Label htmlFor="predeterminado">
                    Usar como dirección predeterminada
                  </Label>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleAddAddress}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  disabled={
                    !newAddress.calle ||
                    !newAddress.numero ||
                    !newAddress.colonia ||
                    !newAddress.ciudad ||
                    !newAddress.estado ||
                    !newAddress.codigo_postal
                  }
                >
                  Guardar dirección
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
