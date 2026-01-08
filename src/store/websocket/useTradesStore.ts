import { create } from 'zustand';
import type { TradesData } from '../../types/websocket';

interface TradesStore {
  tradesData: TradesData | null; // 최신 단일 체결 데이터 (기존 호환성 유지)
  tradesList: TradesData[]; // 체결 내역 리스트
  addTrade: (data: TradesData) => void; // 새 체결 추가
  setTradesData: (data: TradesData) => void; // 최신 체결 데이터 설정 (기존 호환성)
  clearTradesData: () => void;
  clearTradesList: () => void;
}

export const useTradesStore = create<TradesStore>((set) => ({
  tradesData: null,
  tradesList: [],
  addTrade: (data) =>
    set((state) => ({
      tradesData: data, // 최신 데이터도 업데이트
      tradesList: [data, ...state.tradesList].slice(0, 30),
    })),
  setTradesData: (data) => set({ tradesData: data }),
  clearTradesData: () => set({ tradesData: null }),
  clearTradesList: () => set({ tradesList: [] }),
}));
