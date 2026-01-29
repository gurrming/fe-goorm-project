import { create } from 'zustand';
import type { TTrade } from '../../types/transaction';
import type { TradesData } from '../../types/websocket';

type TradeItem = TTrade | TradesData;

interface TradesStore {
  tradesData: TradeItem | null; // 최신 단일 체결 데이터 (REST API or WebSocket 사용)
  tradesList: TradeItem[]; // 체결 내역 리스트 REST API or WebSocket
  addTrade: (data: TradesData) => void; // 새 체결 추가
  setTradesData: (data: TradesData) => void; // 최신 체결 데이터 설정 (기존 호환성)
  restApiInitData: (trades: TTrade[] | null) => void; // REST API 데이터로 초기화
  clearTradesData: () => void;
  clearTradesList: () => void;
}

export const useTradesStore = create<TradesStore>((set) => ({
  tradesData: null,
  tradesList: [],
  addTrade: (data) =>
    set((state) => {
      return {
        tradesData: data, // 최신 데이터도 업데이트
        tradesList: [data, ...state.tradesList].slice(0, 30),
      };
    }),
  setTradesData: (data) => set({ tradesData: data }),
  restApiInitData: (trades) => {
    if (!trades) {
      set({ tradesList: [], tradesData: null });
      return;
    }

    // 백엔드에서 정렬된 데이터 제공
    // 최신 데이터는 WebSocket에서만 사용하므로 null로 설정
    set({
      tradesList: trades,
      tradesData: null,
    });
  },
  clearTradesData: () => set({ tradesData: null }),
  clearTradesList: () => set({ tradesList: [] }),
}));
