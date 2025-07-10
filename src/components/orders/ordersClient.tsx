"use client";

import { useState } from "react";
import { Order } from "@/types/order.type";
import TabOrder from "./tabOrder.component";
import AccordionOrder from "./accordionOrder.component";

interface Props {
    pedidos: Order[];
}

const OrdersTabClient: React.FC<Props> = ({ pedidos }) => {
    const allStatuses = pedidos
        .map((p) => p.estado_actual)
        .filter((status): status is string => status !== null);

    const uniqueStatuses = Array.from(new Set(allStatuses));
    const [selectedStatus, setSelectedStatus] = useState<string>("Todos");

    const filteredOrders =
        selectedStatus === "Todos"
            ? pedidos
            : pedidos.filter((pedido) => pedido.estado_actual === selectedStatus);

    return (
        <div className="w-full space-y-5">
            {/* Tabs dinámicos */}
            <div className="tabs__container flex w-full gap-3 flex-wrap">
                <TabOrder
                    key="Todos"
                    title="Todos"
                    isActive={selectedStatus === "Todos"}
                    onClick={() => setSelectedStatus("Todos")}
                />
                {uniqueStatuses.map((status) => (
                    <TabOrder
                        key={status}
                        title={status}
                        isActive={selectedStatus === status}
                        onClick={() => setSelectedStatus(status)}
                    />
                ))}
            </div>

            {/* Pedidos filtrados */}
            <div className="orders__container space-y-4">
                {filteredOrders.map((pedido, index) => (
                    <AccordionOrder key={index} Order={pedido} />
                ))}
                {filteredOrders.length === 0 && (
                    <div className="text-gray-500">No hay pedidos con este estatus.</div>
                )}
            </div>
        </div>
    );
};

export default OrdersTabClient;
