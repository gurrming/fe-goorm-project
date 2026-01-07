import { create } from 'zustand';
import type { TickerData } from '../../types/websocket';

interface TickerStore {
  tickerData: TickerData | null;
  setTickerData: (data: TickerData) => void;
  clearTickerData: () => void;
}

export const useTickerStore = create<TickerStore>((set) => ({
  tickerData: null,
  setTickerData: (data) => set({ tickerData: data }),
  clearTickerData: () => set({ tickerData: null }),
}));
