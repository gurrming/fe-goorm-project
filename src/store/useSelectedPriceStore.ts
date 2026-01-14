import { create } from 'zustand';

interface ISelectedPriceStore {
  selectedPrice: number | null;
  selectedQuantity: number | null;
  setSelectedPrice: (price: number) => void;
  setSelectedPriceAndQuantity: (price: number, quantity: number) => void;
  clearSelectedPrice: () => void;
}

const useSelectedPriceStore = create<ISelectedPriceStore>((set) => ({
  selectedPrice: null,
  selectedQuantity: null,
  setSelectedPrice: (price) => set({ selectedPrice: price, selectedQuantity: null }),
  setSelectedPriceAndQuantity: (price, quantity) => set({ selectedPrice: price, selectedQuantity: quantity }),
  clearSelectedPrice: () => set({ selectedPrice: null, selectedQuantity: null }),
}));

export default useSelectedPriceStore;
