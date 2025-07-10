import axiosInstance from "../api";

export const checkout = async () => {
    try {
        const response = await axiosInstance.post("/cart/checkout");
        const data = response?.data;

        return data;
    } catch (error) {
        console.error("Error al realizar el checkout", error);
        return null;
    }
};

export const getOrders = async () => {
    try {
        const response = await axiosInstance.get("/cart/mis-pedidos");
        const data = response?.data;

        return data?.pedidos;
    } catch (error) {
        console.error("Error al obtener los pedidos del usuario: ", error);
        return null;
    }
};

export const getOrderDetails = async (pedidoId: string) => {
    try {
        const response = await axiosInstance.get(`/cart/pedidos/${pedidoId}/detalle`);
        const data = response?.data;

        return data;
    } catch (error) {
        console.error("Error al obtener los pedidos del usuario: ", error);
        return null;
    }
}

export const getOrderTracking = async (pedidoId: string) => {
    try {
        const response = await axiosInstance.get(`/cart/pedidos/${pedidoId}/seguimiento`);
        const data = response?.data;

        return data;
    } catch (error) {
        console.error("Error al obtener los pedidos del usuario: ", error);
        return null;
    }
}