"use client";

import { Product } from "@/types/product.type";
import { formatCurrency } from "@/utils/generic";

const ItemShoppingShipping = ({ item }: { item: Product }) => {
  return (
    <div className="item-shopping-shipping flex gap-5 w-full">
      <div className="item-shopping-shipping__image max-w-[15%] min-w-[15%] w-[15%]">
        <img
          src={item.imagen1 as string}
          alt={item.descripcion}
          className="w-auto h-auto object-scale-down"
        />
      </div>
      <div className="item-shopping-shipping__info w-[60%]">
        <p className="item-shopping-shipping__marca font-[500] text-oscuro2 text-sm">
          {item.marca}
        </p>
        <p className="item-shopping-shipping__name text-oscuro1 text-sm">
          {item.descripcion}
        </p>
        <p className="item-shopping-shipping__quantity">x{item.quantity}</p>
      </div>
      <div className="item-shopping-shipping__price mt-5 w-[20%]">
        <p className="item-shopping-shipping__price text-sm font-semibold">
          {formatCurrency(item.precio1)}
        </p>
      </div>
    </div>
  );
};

export default ItemShoppingShipping;
