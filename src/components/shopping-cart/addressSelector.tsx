"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPlus,
  FaMapMarkerAlt,
  FaHome,
  FaBriefcase,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Address {
  id: string;
  type: "home" | "work" | "other";
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  colony: string;
  additionalInfo?: string;
}

const mockAddresses: Address[] = [
  {
    id: "1",
    type: "home",
    name: "Casa",
    street: "Av. Revolución #123",
    city: "Ciudad de México",
    state: "CDMX",
    zipCode: "06700",
    colony: "Del Valle",
    additionalInfo: "Casa azul, portón negro",
  },
  {
    id: "2",
    type: "work",
    name: "Oficina",
    street: "Paseo de la Reforma #456",
    city: "Ciudad de México",
    state: "CDMX",
    zipCode: "06600",
    colony: "Juárez",
    additionalInfo: "Edificio corporativo, piso 15",
  },
  {
    id: "3",
    type: "other",
    name: "Casa de Mamá",
    street: "Calle Morelos #789",
    city: "Guadalajara",
    state: "Jalisco",
    zipCode: "44100",
    colony: "Centro",
    additionalInfo: "Casa esquina, puerta café",
  },
];

export default function AddressSelector() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newAddress, setNewAddress] = useState<Partial<Address>>({
    type: "home",
    name: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    colony: "",
    additionalInfo: "",
  });

  // Simular carga de datos del endpoint
  useEffect(() => {
    const fetchAddresses = async () => {
      setLoading(true);
      // Simular delay de API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setAddresses(mockAddresses);
      setLoading(false);
    };

    fetchAddresses();
  }, []);

  const getAddressIcon = (type: string) => {
    switch (type) {
      case "home":
        return <FaHome className="w-4 h-4" />;
      case "work":
        return <FaBriefcase className="w-4 h-4" />;
      default:
        return <FaMapMarkerAlt className="w-4 h-4" />;
    }
  };

  const handleAddAddress = () => {
    if (newAddress.name && newAddress.street && newAddress.city) {
      const address: Address = {
        id: Date.now().toString(),
        type: newAddress.type as "home" | "work" | "other",
        name: newAddress.name,
        street: newAddress.street,
        city: newAddress.city,
        state: newAddress.state || "",
        zipCode: newAddress.zipCode || "",
        colony: newAddress.colony || "",
        additionalInfo: newAddress.additionalInfo || "",
      };

      setAddresses([...addresses, address]);
      setNewAddress({
        type: "home",
        name: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        colony: "",
        additionalInfo: "",
      });
      setShowAddForm(false);
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <p className="">Elige una dirección guardada o agrega una nueva</p>
      </motion.div>

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
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedAddressId === address.id
                      ? "ring-2 ring-blue-500 bg-blue-50 border-blue-200 shadow-lg"
                      : "hover:shadow-lg border-gray-200"
                  }`}
                  onClick={() => setSelectedAddressId(address.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`p-2 rounded-full ${
                          selectedAddressId === address.id
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {getAddressIcon(address.type)}
                      </div>
                      <h3 className="font-semibold text-lg text-gray-800">
                        {address.name}
                      </h3>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600">
                      <p className="font-medium text-gray-800">
                        {address.street}
                      </p>
                      <p>
                        {address.colony}, {address.city}
                      </p>
                      <p>
                        {address.state} {address.zipCode}
                      </p>
                      {address.additionalInfo && (
                        <p className="text-xs text-gray-500 italic">
                          {address.additionalInfo}
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
                  <Label htmlFor="addressType">Tipo de dirección</Label>
                  <Select
                    value={newAddress.type}
                    onValueChange={(value) =>
                      setNewAddress({
                        ...newAddress,
                        type: value as "home" | "work" | "other",
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="home">🏠 Casa</SelectItem>
                      <SelectItem value="work">💼 Trabajo</SelectItem>
                      <SelectItem value="other">📍 Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="name">Nombre de la dirección</Label>
                  <Input
                    id="name"
                    placeholder="Ej: Casa, Oficina, Casa de mamá"
                    value={newAddress.name}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, name: e.target.value })
                    }
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="street">Calle y número</Label>
                  <Input
                    id="street"
                    placeholder="Ej: Av. Revolución #123"
                    value={newAddress.street}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, street: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="city">Ciudad</Label>
                  <Input
                    id="city"
                    placeholder="Ciudad de México"
                    value={newAddress.city}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, city: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="colony">Colonia</Label>
                  <Input
                    id="colony"
                    placeholder="Del Valle"
                    value={newAddress.colony}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, colony: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="state">Estado</Label>
                  <Input
                    id="state"
                    placeholder="CDMX"
                    value={newAddress.state}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, state: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="zipCode">Código Postal</Label>
                  <Input
                    id="zipCode"
                    placeholder="06700"
                    value={newAddress.zipCode}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, zipCode: e.target.value })
                    }
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="additionalInfo">
                    Indicaciones adicionales
                  </Label>
                  <Textarea
                    id="additionalInfo"
                    placeholder="Ej: Casa azul, portón negro, entre calles..."
                    value={newAddress.additionalInfo}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        additionalInfo: e.target.value,
                      })
                    }
                    rows={3}
                  />
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
                    !newAddress.name || !newAddress.street || !newAddress.city
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
