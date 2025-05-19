"use client";

import { handleDecreaseQuantity, handleIncreaseQuantity, handleRemoveFromCart } from "@/handlers/cartHandlers";
import { Product } from "@/types/product.type";
import { formatCurrency } from "@/utils/generic";
import { BiTrash } from "react-icons/bi";
import { GoDash, GoPlus } from "react-icons/go";


const ItemShoppingCart = ({ item }: { item: Product }) => {

  return (
    <div className="itemShoppingCart flex w-full">
      <div className="itemShoppingCart__image max-w-[200px] w-[200px] px-4">
        <img src={item.imagen1 as string} className="object-cover w-full h-auto" />
      </div>
      <div className="itemShoppingCart__info flex flex-col py-3">
        <div className="marca text-oscuro2 text-sm flex-1 w-full">
          {item.marca}
        </div>
        <div className="nombre text-primario font-semibold flex-1 w-full">
          {item.descripcion}
        </div>
        <div className="sku font-[500] text-sm flex-1 w-full">{item.codigo}</div>
        <div className="quantity flex-1 w-full">
          <div className="flex items-center border border-gray-200 py-[2px] w-max rounded-lg">
            <button onClick={() => handleDecreaseQuantity(item.clave)} className=" text-gray-700 px-2 py-1 rounded-l m-auto cursor-pointer">
              <GoDash color="#e12424" />
            </button>
            <span className="mx-3 text-sm font-[500]">{item.quantity}</span>
            <button onClick={() => handleIncreaseQuantity(item.clave)} className=" text-gray-700 px-2 py-1 rounded-r m-auto cursor-pointer">
              <GoPlus color="#02308e" />
            </button>
          </div>
        </div>
      </div>
      <div className="itemShoppingCart__price flex flex-col ms-auto  justify-between pb-5">
        <div className="price text-xl font-semibold ms-auto">{formatCurrency(item.precio1)}</div>
        <div onClick={() => handleRemoveFromCart(item?.clave)} className="delete__Product flex text-oscuro2 text-sm hover:underline cursor-pointer">
          <BiTrash className="m-auto" />
          <span className="ms-3">Eliminar del carrito</span>
        </div>
      </div>
    </div>
  );
};

export default ItemShoppingCart;
