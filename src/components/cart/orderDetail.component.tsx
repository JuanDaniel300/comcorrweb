"use client;"
import { SlArrowRight } from "react-icons/sl";
import ListShoppingShipping from "./listShoppingShipping.component";
import { motion } from "framer-motion";
import ListItemRecomended from "./listItemsRecomended.component";

const products = [
  {
    id: 1,
    marca: "SAMSUNG",
    name: "Lavadora Aqua Saving 19 Kilos Samsung",
    sku: "WA19A3351GW/AX",
    price: "$8,499.00",
    image: "/products/refrigerador.png",
    quantity: 1,
    isOffer: true,
    offerDetails: {
      discount: 3000,
      discountType: "MXN",
    },
  },

  {
    id: 1,
    marca: "MIRAGE",
    name: "Refrigerador 10 Pies Midea Blue Steel Top Mount",
    sku: "MRX10FS",
    price: "$6,499.00",
    image: "/products/refrigerador2.png",
    quantity: 1,
    isOffer: true,
    offerDetails: {
      discount: 3000,
      discountType: "MXN",
    },
  },
];

const OrderDetail = ({
  showRecommended = true,
}: {
  showRecommended: boolean;
}) => {
  return (
    <div>
      <div className="text-xl  font-semibold">Tu Pedido</div>

      {/* Products */}
      <div className="products w-full my-5">
        <ListShoppingShipping products={products} />
      </div>

      {/* Divider */}

      {/* Codigo de descuento */}
      {showRecommended && (
        <>
          <hr className="border border-gray-100" />
          <div className="w-full mb-5">
            <div className="w-full mt-5 flex gap-4">
              <input
                type="text"
                placeholder="Código de descuento"
                className="w-full p-2 border border-gray-300 rounded-lg text-sm"
              />
              <motion.button
                whileHover={{
                  background: "var(--degradadoPrimario)",
                }}
                className="bg-primario px-3 py-3 rounded-full cursor-pointer"
              >
                <SlArrowRight color="white" />
              </motion.button>
            </div>
          </div>
        </>
      )}

      {/* Divider */}
      <hr className="border border-gray-100" />

      {/* Subtotal, envio  */}
      <div className="w-full">
        <div className="border-b-2 border-gray-100 pt-5 pb-0 ">
          <div className="flex space-y-3 justify-between m-auto">
            <div className="text-oscuro2 text-sm">Subtotal</div>
            <div className="text-oscuro2 text-sm font-semibold">$17,998.00</div>
          </div>
          <div className="flex space-y-3 justify-between m-auto">
            <div className="text-oscuro2 text-sm">Envio</div>
            <div className="text-oscuro2 text-sm font-semibold">$50.00</div>
          </div>
        </div>

        <div className="my-4 mb-2 border-gray-100">
          <div className="flex space-y-3 justify-between m-auto">
            <div className="text-oscuro2  font-[500]">Total</div>
            <div className="text-secundario font-semibold text-base ">
              $14,998.00
            </div>
          </div>
        </div>
      </div>

      {/* Productos recomnedados */}
      {showRecommended && (
        <div className="w-full border-t-2 border-gray-100">
          <div className="text-lg  font-semibold mt-5">
            También podria interesarte
          </div>
          <div className="w-full mt-5">
            <ListItemRecomended products={products} />
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetail;
