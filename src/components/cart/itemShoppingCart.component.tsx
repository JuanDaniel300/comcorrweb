"use client";

import { BiTrash } from "react-icons/bi";
import { GoDash, GoPlus } from "react-icons/go";

type ItemShoppingCartProps = {
  id: string;
  marca: string;
  name: string;
  sku: string;
  price: string;
  image: string;
  quantity: number;
  isOffer: boolean;
  offerDetails: {
    discount: number;
    discountType: string;
  };
  combobox: {
    id: string;
    name: string;
  };
};

const ItemShoppingCart = ({ item }: { item: ItemShoppingCartProps }) => {
  return (
    <div className="itemShoppingCart flex w-full">
      <div className="itemShoppingCart__image">
        <img src={item.image} className="object-cover h-auto" />
      </div>
      <div className="itemShoppingCart__info flex flex-col py-3">
        <div className="marca text-oscuro2 text-sm flex-1 w-full">
          {item.marca}
        </div>
        <div className="nombre text-primario font-semibold flex-1 w-full">
          {item.name}
        </div>
        <div className="sku font-[500] text-sm flex-1 w-full">{item.sku}</div>
        <div className="quantity flex-1 w-full">
          <div className="flex items-center border border-gray-200 py-[2px] w-max rounded-lg">
            <button className=" text-gray-700 px-2 py-1 rounded-l m-auto cursor-pointer">
              <GoDash color="#e12424" />
            </button>
            <span className="mx-3 text-sm font-[500]">{item.quantity}</span>
            <button className=" text-gray-700 px-2 py-1 rounded-r m-auto cursor-pointer">
              <GoPlus color="#02308e" />
            </button>
          </div>
        </div>
      </div>
      <div className="itemShoppingCart__price flex flex-col ms-auto  justify-between pb-5">
        <div className="price text-xl font-semibold ms-auto">{item.price}</div>
        <div className="delete__Product flex text-oscuro2 text-sm hover:underline cursor-pointer">
          <BiTrash className="m-auto" />
          <span className="ms-3">Eliminar del carrito</span>
        </div>
      </div>
    </div>
  );
};

export default ItemShoppingCart;
