"use client";

import ItemShoppingShipping from "./itemShoppingShipping.component";

const ListShoppingShipping = ({ products }: { products: any }) => {
  return (
    <div className="w-full space-y-5">
      {products.map((product: any, index: number) => (
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
