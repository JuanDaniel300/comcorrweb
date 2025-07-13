"use client";

import { FC, useState } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import Button from "../Button/Button";
import { Order } from "@/types/order.type";
import { formatDate } from "@/utils/generic";
import { useRouter } from "next/navigation";

interface AccordionOrderProps {
  Order: Order;
}

const getStatus = ({ statusOrder }: { statusOrder: string }) => {
  switch (statusOrder) {
    case 'En preparación':
      return <span className=" text-orange-500 ">En preparación</span>;
    case 'Pendiente':
      return <span className=" text-yellow-500 ">Pendiente</span>;
    case 'En camino':
      return <span className="text-blue-700">En camino</span>;
    case 'En proceso':
      return <span className="text-orange-400">En proceso</span>;
    case 'Cancelado':
      return <span className="text-red-700">Cancelado</span>;
    default:
      return <span className="text-red-700">Sin estatus</span>;
      ;
  }
};

const AccordionOrder: FC<AccordionOrderProps> = ({
  Order,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();


  const handlerOnClick = (e: React.MouseEvent<HTMLButtonElement>, pedidoId: number) => {
    e.preventDefault();
    e.stopPropagation();

    router.push(`/profile/orders/${pedidoId}`);
  }

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };


  return (
    <motion.div
      onClick={handleOpen}
      className="w-full bg-white rounded-xl cursor-pointer border border-gray-200"
    >
      {/* header */}
      <div className="grid grid-cols-6 px-5 py-3 overflow-hidden">
        <div className="accordion__item text-oscuro2 font-[500] text-sm">
          Pedido realizado el
          <div className="text-oscuro100 font-[500] text-sm">{formatDate(Order.fecha_venta)}</div>
        </div>
        <div className="accordion__item text-oscuro2 font-[500] text-sm">
          Numero del pedido
          <div className="text-oscuro100 font-[500] text-sm">{Order.pedido_id}</div>
        </div>
        <div className="accordion__item text-oscuro2 font-[500] text-sm">
          Estado del pedido
          <div className="text-oscuro100 font-[500] text-sm">
            {getStatus({ statusOrder: Order.estado_actual })}
          </div>
        </div>
        <div className="accordion__item text-oscuro2 font-[500] text-sm">
          Total Articulos
          <div className="text-oscuro100 font-[500] text-sm">{Order.total_articulos}</div>
        </div>
        <div className="accordion__item w-full ">
          <Button className="" onClick={(e) => {
            handlerOnClick(e, Order.pedido_id)
          }} title="Ver pedido" />
        </div>
        <div className="accordion__item flex justify-center items-center ">
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-oscuro2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </motion.svg>
        </div>
      </div>

      {/* body */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <AccordionBody />
      </motion.div>
    </motion.div>
  );
};

const AccordionBody = () => {
  return (
    <div className="mt-4 bg-gray-200 px-5 py-3 rounded-b-xl">
      {/* soporte y fecha de entrega estimada */}
      <div className="flex justify-between">
        <div>
          <h1 className="text-sm font-semibold">Envío a domicilio</h1>
          <h1 className="text-sm">Fecha de entrega estimada: 4/05/2025</h1>
        </div>
        <div>
          <Button
            className="px-2"
            variants="outline"
            icon={<FaWhatsapp size={20} />}
            title="Soporte en Whatsapp"
          />
        </div>
      </div>

      <hr className="border-gray-300 my-4" />

      <div className="">
        {/* <ListShoppingShipping products={products as Product[]} /> */}
      </div>
    </div>
  );
};

export default AccordionOrder;
