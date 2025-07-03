import axiosInstance from "../api";

export const checkout = async () => {
  try {
    const response = await axiosInstance.post("/cart/checkout");
    const data = response?.data;

    return data;
  } catch (error) {
    console.error("Error al realizar el checkout");
    return null;
  }
};

export const createOrder = async (dirrecionId: number) => {
  try {
    const response = await axiosInstance.post("/cart/comprar", {
      direccion_id: dirrecionId,
    });
    const data = response?.data;

    console.log(data);
    return data;
  } catch (error) {
    console.error("Error al crear el pedido");
    return null;
  }
};
