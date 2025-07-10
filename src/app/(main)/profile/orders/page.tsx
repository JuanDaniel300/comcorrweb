
import { useRouter } from "nextjs-toploader/app";
import Breadcrumbs from "@/components/Breadcrumbs/breadCrumbs";
import TabOrder from "@/components/orders/tabOrder.component";
import { getOrders } from "@/services/orders/orders";
import { Order } from "@/types/order.type";
import AccordionOrder from "@/components/orders/accordionOrder.component";
import OrdersTabClient from "@/components/orders/ordersClient";


export default async function Page() {
  // const router = useRouter();

  // const handlerGoToDetailsOrder = (e: { preventDefault: () => void }) => {
  //   e.preventDefault();
  //   router.push("/profile/orders/detailsOrder");
  // };

  const pedidos: Order[] = await getOrders();

  console.table(pedidos)

  return (
    <div className="min-h-screen padding-top ">
      <div className="container mx-auto px-20 py-10">
        {/* Breadcrums */}
        <div className="w-full mb-10">
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