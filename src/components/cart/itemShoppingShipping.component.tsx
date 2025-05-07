"use client";

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

const ItemShoppingShipping = ({ item }: { item: ItemShoppingCartProps }) => {
  return (
    <div className="item-shopping-shipping flex gap-5 w-full">
      <div className="item-shopping-shipping__image max-w-[15%] min-w-[15%] w-[15%]">
        <img
          src={item.image}
          alt={item.name}
          className="w-auto h-auto object-cover"
        />
      </div>
      <div className="item-shopping-shipping__info w-[60%]">
        <p className="item-shopping-shipping__marca font-[500] text-oscuro2 text-sm">
          {item.marca}
        </p>
        <p className="item-shopping-shipping__name text-oscuro1 text-sm">
          {item.name}
        </p>
        <p className="item-shopping-shipping__quantity">x{item.quantity}</p>
      </div>
      <div className="item-shopping-shipping__price mt-5 w-[20%]">
        <p className="item-shopping-shipping__price text-sm font-semibold">
          {item.price}
        </p>
      </div>
    </div>
  );
};

export default ItemShoppingShipping;
