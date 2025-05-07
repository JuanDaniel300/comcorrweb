"use client";

import ItemRecomended from "./itemsRecomended.component";

const ListItemRecomended = ({ products }: { products: any }) => {
  return (
    <div className="w-full space-y-5">
      {products.map((product: any, index: number) => (
        <div>
          <ItemRecomended item={product} />

          {index === products.length - 1 ? null : (
            <hr className="border border-gray-100 mt-5" />
          )}
        </div>
      ))}
    </div>
  );
};

export default ListItemRecomended;
