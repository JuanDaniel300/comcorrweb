"use client";
import { useEffect } from "react";
import { useRouter } from "nextjs-toploader/app";
import Breadcrumbs from "@/components/Breadcrumbs/breadCrumbs";
import TabOrder from "@/components/orders/tabOrder.component";
import AccordionOrder from "@/components/orders/accordionOrder.component";

export const OrderView = () => {
  const router = useRouter();
  useEffect(() => {
    console.log("OrderView");
  }, []);

  const handlerGoToDetailsOrder = (e: any) => {
    e.preventDefault();
    router.push("/profile/orders/detailsOrder");
  };

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

        <div className="w-full mb-5 space-y-5">
          {/* Tabs */}
          <div className="tabs__container flex w-full gap-3">
            <TabOrder title="Pedidos pendientes de envio" childrenId={1} />
            <TabOrder title="Pedidos en camino" childrenId={1} />
            <TabOrder title="Pedidos entregados" childrenId={1} />
            <TabOrder title="Pedidos cancelados" childrenId={1} />
          </div>

          {/* Orders */}
          <div className="orders__container space-y-4">
            <AccordionOrder
              handlerOnClick={handlerGoToDetailsOrder}
              typeOrder={1}
            />
            <AccordionOrder
              handlerOnClick={handlerGoToDetailsOrder}
              typeOrder={2}
            />
            <AccordionOrder
              handlerOnClick={handlerGoToDetailsOrder}
              typeOrder={3}
            />
            <AccordionOrder
              handlerOnClick={handlerGoToDetailsOrder}
              typeOrder={4}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderView;
