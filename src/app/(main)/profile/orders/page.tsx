
import Breadcrumbs from "@/components/Breadcrumbs/breadCrumbs";
import { getOrders } from "@/services/orders/orders";
import { Order } from "@/types/order.type";
import OrdersTabClient from "@/components/orders/ordersClient";


export default async function Page() {
  const pedidos: Order[] = await getOrders();

  console.table(pedidos)

  return (
    <div className=" ">
      <div className="">
        {/* Breadcrums */}
        <div className="w-full mb-5">
          <Breadcrumbs
            Breadcrumbs={[
              { title: "Perfil", link: "/profile" },
              { title: "Pedidos", link: "" },
            ]}
          />
        </div>

        <div className="w-full mb-5">
          <div className="font-semibold text-primario text-2xl">
            Mis pedidos
          </div>
        </div>

        <OrdersTabClient pedidos={pedidos} />
      </div>
    </div>
  );
}