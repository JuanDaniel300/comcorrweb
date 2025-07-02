"use client";

import ItemShoppingCart from "./itemShoppingCart.component";
import { Product } from "@/types/product.type";

const ListShoppingCart = ({ products }: { products: Product[] }) => {
  return (
    <div className="w-full space-y-5">
      {products.map((product: Product, index: number) => (
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
