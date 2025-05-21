"use client";

import { useCartStore } from "@/stores/cartStore";
import ItemShoppingCart from "./itemShoppingCart.component";

const ListShoppingCart = ({ products }: { products: any }) => {
  console.log({ products });
  return (
    <div className="w-full space-y-5">
      {products.map((product: any, index: number) => (
        <div key={index}>
          <ItemShoppingCart item={product} />

          {index === products.length - 1 ? null : (
            <hr className="border border-gray-100 mt-5" />
          )}
        </div>
      ))}
    </div>
  );
};

export default ListShoppingCart;
