import { create } from 'zustand';
import type { OrderbookLastPrice, OrderbookPayload } from '../../types/websocket';

interface OrderbookStore {
  lastPrice: OrderbookLastPrice | null;
  orderbookData: Record<number, OrderbookPayload | null>; // categoryId를 키로 하는 객체
  setLastPrice: (data: OrderbookLastPrice) => void;
  setOrderbookData: (categoryId: number, data: OrderbookPayload) => void;
  clearLastPrice: () => void;
  clearOrderbookData: (categoryId?: number) => void; // categoryId가 없으면 전체 삭제
}

export const useOrderbookStore = create<OrderbookStore>((set) => ({
  lastPrice: null,
  orderbookData: {},
  setLastPrice: (data) => set({ lastPrice: data }),
  setOrderbookData: (categoryId, data) =>
    set((state) => ({
      orderbookData: {
        ...state.orderbookData,
        [categoryId]: data,
      },
    })),
  clearLastPrice: () => set({ lastPrice: null }),
  clearOrderbookData: (categoryId) =>
    set((state) => {
      if (categoryId) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [categoryId]: _, ...rest } = state.orderbookData;
        return { orderbookData: rest };
      }
      return { orderbookData: {} };
    }),
}));
