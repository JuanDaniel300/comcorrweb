import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AddressStore {
  selectedAddress: number | null;
  setSelectedAddress: (id: number | null) => void;
}

export const useAddressStore = create<AddressStore>()(
  persist(
    (set) => ({
      selectedAddress: null,
      setSelectedAddress: (id) => set({ selectedAddress: id }),
    }),
    {
      name: "selected-address",
    }
  )
);
