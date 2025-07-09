"use client";

import { Product } from "@/types/product.type";
import ItemShoppingShipping from "./itemShoppingShipping.component";

const ListShoppingShipping = ({ products }: { products: Product[] }) => {
  return (
    <div className="w-full space-y-5">
      {products.map((product: Product, index: number) => (
        <div key={index}>
          <ItemShoppingShipping item={product} />

          {index === products.length - 1 ? null : (
            <hr className="border border-gray-100 mt-5" />
          )}
        </div>
      ))}
    </div>
  );
};

export default ListShoppingShipping;
