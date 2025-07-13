
import React from "react";
import { FaClipboardList, FaWhatsapp } from "react-icons/fa";
import { TfiReload } from "react-icons/tfi";
import { BsCartCheck, BsHouseCheck } from "react-icons/bs";
import { FaBox } from "react-icons/fa6";
import { GrMapLocation } from "react-icons/gr";
import Breadcrumbs from "@/components/Breadcrumbs/breadCrumbs";
import Button from "@/components/Button/Button";
import ListShoppingShipping from "@/components/cart/listShoppingShipping.component";
import { getOrderDetails, getOrderTracking } from "@/services/orders/orders";
import Map from "@/components/map/map";

type Params = Promise<{ id: string }>;

const statuses = [
  { id: 1, label: "Pedido realizado", icon: <BsCartCheck size={30} /> },
  { id: 2, label: "Pedido en proceso", icon: <FaBox size={30} /> },
  { id: 3, label: "Pedido en camino", icon: <GrMapLocation size={30} /> },
  { id: 4, label: "Pedido entregado", icon: <BsHouseCheck size={30} /> },
];

type ProductOrder = {
  articulo_id: number,
  descripcion: string,
  cantidad: number,
  precio: string,
  total: string,
  imagen1: string
}


export interface Status {
  id: string;
  label: string;
  icon: React.ReactNode;
}


interface SeguimientoItem {
  estado: string;
  fecha: string | null;
}

function filterUniqueWithDate(seguimiento: SeguimientoItem[]): SeguimientoItem[] {
  const seen = new Set<string>();

  return seguimiento
    .filter(item => item.fecha != null)
    .filter(item => {
      if (seen.has(item.estado)) {
        return false;
      } else {
        seen.add(item.estado);
        return true;
      }
    });
}


export default async function DetailsOrderView(props: { params: Params }) {
  const params = await props.params;
  const id = params.id;

  const order = await getOrderDetails(id);
  const tracking = await getOrderTracking(id);

  const uniqueWithDate = filterUniqueWithDate(tracking?.seguimiento);
  console.log(uniqueWithDate);


  const detalle = order?.detalle.map((producto: ProductOrder) => {
    return {
      id: producto?.articulo_id,
      descripcion: producto?.descripcion,
      precio1: producto?.precio,
      imagen1: producto?.imagen1,
      quantity: producto?.cantidad,
    }
  });


  return (
    <div className=" ">
      <div className="">
        {/* Breadcrums */}
        <div className="w-full mb-5">
          <Breadcrumbs
            Breadcrumbs={[
              { title: "Perfil", link: "/profile" },
              { title: "Pedidos", link: "/profile/orders" },
              { title: "Detalle", link: "" },
            ]}
          />
        </div>

        <div className="w-full mb-5">
          <div className="font-semibold text-primario text-2xl">
            Detalles del pedido
          </div>
        </div>

        {/* linetime */}
        <div className="w-full mb-5 space-y-5">
          <div className="bg-white rounded-lg border border-gray-200 p-3 relative ">
            {/* title */}
            <h1 className="text-primario font-[500] mb-3">
              Estatus del pedido
            </h1>

            {/* Timeline */}
            <Timeline currentIndex={1} />

          </div>
        </div>

        {/* grid section */}
        <div className="w-full">
          <div className="grid grid-cols-2 gap-10">
            <div>
              <div className="bg-white rounded-lg border border-gray-200 p-3">
                {/* title */}
                <h1 className="text-primario font-[500] mb-2">Detalles</h1>

                {/* body */}
                <div className="order__body space-y-2">
                  <div className="order__body__item">
                    <span className="text-sm font-[500]">
                      Número de compra:{" "}
                    </span>
                    <span className="text-sm text-oscuro2">{id}</span>
                  </div>
                  <div className="order__body__item">
                    <span className="text-sm font-[500]">
                      Fecha de compra:{" "}
                    </span>
                    <span className="text-sm text-oscuro2">16/02/2024</span>
                  </div>
                  <div className="order__body__item">
                    <span className="text-sm font-[500]">Monto total: </span>
                    <span className="text-sm text-oscuro2">$14,998.00</span>
                  </div>
                  <div className="order__body__item ">
                    <Button
                      icon={<FaWhatsapp />}
                      title="Soporte en Whatsapp"
                      className="w-max px-5 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-white rounded-lg border border-gray-200 p-3">
                {/* title */}
                <h1 className="text-primario font-[500] mb-3">
                  Información de la orden
                </h1>

                {/* body */}
                <div className="order__body space-y-2">
                  <div className="order__body__item">
                    <span className="text-sm font-[500]">
                      Método de entrega:{" "}
                    </span>
                    <span className="text-sm text-oscuro2">
                      Enviar a dirección
                    </span>
                  </div>
                  <div className="order__body__item">
                    <span className="text-sm font-[500]">Método de pago: </span>
                    <span className="text-sm text-oscuro2">
                      Tarjeta de debito
                    </span>
                  </div>
                  <div className="order__body__item">
                    <span className="text-sm font-[500]">Factura: </span>
                    <span className="text-sm text-oscuro2">Si</span>
                  </div>
                  <div className="order__body__item ">
                    <Button
                      icon={<FaClipboardList />}
                      variants="outline"
                      title="Descargar factura"
                      className="w-max px-5 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-white rounded-lg border border-gray-200 p-3">
                {/* title */}
                <h1 className="text-primario font-[500] mb-4">Productos</h1>

                {/* body */}
                <div className="order__body space-y-4">
                  <div className="order__body__item">
                    <ListShoppingShipping products={detalle} />
                  </div>
                  <div className="order__body__item">
                    <Button
                      icon={<TfiReload />}
                      title="Agregar al carrito nuevamente"
                      className="w-max px-5 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-white rounded-lg border border-gray-200 p-3">
                {/* title */}
                <h1 className="text-primario font-[500] mb-3">Ubicacion</h1>

                {/* body */}
                <div className=" order__body space-y-3">
                  <div className="order__body__item">
                    <span className="text-sm font-[500]">Ciudad: </span>
                    <span className="text-sm text-oscuro2">Macuspana</span>
                  </div>
                  <div className="order__body__item">
                    <span className="text-sm font-[500]">Colonia: </span>
                    <span className="text-sm text-oscuro2">Centro</span>
                  </div>
                  <div className="order__body__item">
                    <span className="text-sm font-[500]">Calle y número: </span>
                    <span className="text-sm text-oscuro2">
                      Av. Alatorre 46
                    </span>
                  </div>
                  <div className="order__body__item">
                    <span className="text-sm font-[500]">Código Postal: </span>
                    <span className="text-sm text-oscuro2">86700</span>
                  </div>
                  <div className="order__body__item">
                    <span className="text-sm font-[500]">
                      Indicaciones Adicionales:{" "}
                    </span>
                    <span className="text-sm text-oscuro2">
                      Casa color turquesa con porton blanco
                    </span>
                  </div>

                  <div>
                    <div className="h-[200px] border border-gray-200 bg-gray-100 rounded-xl">
                      <Map />
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
};



const Timeline = ({ currentIndex }: { currentIndex: number }) => {
  const segments = statuses.length - 1;
  // porcentaje de línea completa hasta currentIndex
  const fillPercent = segments > 0
    ? (currentIndex / segments) * 75
    : 0;

  return (
    <div className="relative w-full px-4 py-6">
      {/* Línea de fondo */}
      <div className="absolute top-[61px]  w-[74%]  left-[150px] h-2 bg-gray-300 transform -translate-y-1/2 z-0" />

      {/* Línea de progreso */}
      <div
        className="absolute top-[61px]   left-[150px] h-2 bg-primario transform -translate-y-1/2 z-10 transition-all duration-500"
        style={{ width: `${fillPercent}%` }}
      />

      {/* Puntos y etiquetas */}
      <div className="flex justify-between relative z-20">
        {statuses.map((status, idx) => {
          const isActive = idx <= currentIndex;
          return (
            <div key={status.id} className="flex flex-col items-center w-1/4">
              {/* Punto */}
              <div
                className={`relative z-10 w-16 h-16 flex items-center justify-center rounded-full
                  ${isActive ? "bg-primario text-white" : "bg-gray-300 text-white"}
                `}
              >
                {status.icon}
              </div>

              {/* Etiqueta */}
              <span
                className={`mt-4 text-sm font-medium
                  ${isActive ? "text-primario" : "text-gray-500"}
                `}
              >
                {status.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
