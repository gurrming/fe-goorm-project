import { create } from 'zustand';
import type { TradesData } from '../../types/websocket';

interface TradesStore {
  tradesData: TradesData | null;
  setTradesData: (data: TradesData) => void;
  clearTradesData: () => void;
}

export const useTradesStore = create<TradesStore>((set) => ({
  tradesData: null,
  setTradesData: (data) => set({ tradesData: data }),
  clearTradesData: () => set({ tradesData: null }),
}));
