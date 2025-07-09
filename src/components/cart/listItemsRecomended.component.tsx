"use client";

import ItemRecomended, {
  ItemShoppingCartProps,
} from "./itemsRecomended.component";

const ListItemRecomended = ({
  products,
}: {
  products: ItemShoppingCartProps[];
}) => {
  return (
    <div className="w-full space-y-5">
      {products.map((product: ItemShoppingCartProps, index: number) => (
        <div key={index}>
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
