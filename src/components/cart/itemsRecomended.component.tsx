"use client";

import { AiOutlineShoppingCart } from "react-icons/ai";
import Button from "../Button/Button";

export type ItemShoppingCartProps = {
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

const ItemRecomended = ({ item }: { item: ItemShoppingCartProps }) => {
  return (
    <div className="item-recomended-shipping flex gap-5 w-full">
      <div className="item-recomended-shipping__image w-[20%] ">
        <img
          src={item.image}
          alt={item.name}
          className="w-auto h-auto object-cover"
        />
      </div>
      <div className="item-recomended-shipping__info w-[60%]">
        <p className="item-recomended-shipping__marca font-[500] text-oscuro2 text-sm">
          {item.marca}
        </p>
        <p className="item-recomended-shipping__name text-oscuro1 text-sm">
          {item.name}
        </p>
        <div>
          <p className="item-recomended-shipping__price text-sm font-semibold">
            {item.price}
          </p>
        </div>
      </div>
      <div className="item-recomended-shipping__addCart mt-5 w-[30%]">
        <Button title="Agregar" icon={<AiOutlineShoppingCart />} />
      </div>
    </div>
  );
};

export default ItemRecomended;
