// 2️⃣ marketStore.ts
// 🎯 한 줄 역할
// 실시간으로 들어온 데이터를 “화면이 쓰기 좋은 형태”로 저장하는 상태 저장소

// 여기서만 하는 일
// ticker / trades / orderbook / charts 상태 보관

// 상태를 바꾸는 action 정의

// 리렌더 최적화를 위한 구조 유지

// 📌 절대 하지 않는 일

// WebSocket 연결 ❌

// STOMP subscribe ❌

// raw message 파싱 ❌

// 왜 zustand인가?
// 실시간 데이터는 빈번한 업데이트

// selector로 부분 구독 가능

// React 외부에서도(getState) 접근 가능
// → socket handler에서 쓰기 좋음

// 비유
// 🧠 기억 저장소

// “현재가 얼마야?” 물으면 바로 대답해줌

// 데이터가 어디서 왔는지는 모름

import { create } from 'zustand';
import type {
  TickerMessage,
  TradesMessage,
  OrderbookLastPriceMessage,
  ChartsMessage,
} from '../lib/realTime/subscribeMarket';

interface MarketStore {
  // Ticker 데이터 (categoryId별로 저장)
  tickers: Map<number, TickerMessage>;
  updateTicker: (data: TickerMessage) => void;
  getTicker: (categoryId: number) => TickerMessage | null;

  // Trades 데이터 (체결 내역 배열 - 최신순)
  trades: TradesMessage[];
  addTrade: (data: TradesMessage) => void;
  clearTrades: () => void;
  // 최대 보관 개수 제한 (성능 최적화)
  maxTradesCount: number;
  setMaxTradesCount: (count: number) => void;

  // Orderbook LastPrice 데이터
  orderbookLastPrice: OrderbookLastPriceMessage | null;
  updateOrderbookLastPrice: (data: OrderbookLastPriceMessage) => void;

  // Charts 데이터 (캔들 배열 - 시간순)
  charts: ChartsMessage[];
  addChart: (data: ChartsMessage) => void;
  updateChart: (data: ChartsMessage) => void; // 같은 시간의 캔들 업데이트
  clearCharts: () => void;
  // 최대 보관 개수 제한 (성능 최적화)
  maxChartsCount: number;
  setMaxChartsCount: (count: number) => void;
}

const useMarketStore = create<MarketStore>((set, get) => ({
  // Ticker 초기값
  tickers: new Map(),
  updateTicker: (data) => {
    // 실시간 업데이트 확인용 로그 (개발 환경에서만)
    if (import.meta.env.DEV) {
      console.log('🔄 Ticker 업데이트:', {
        categoryId: data.categoryId,
        price: data.price,
        changeRate: data.changeRate,
        timestamp: new Date().toLocaleTimeString(),
      });
    }
    set((state) => {
      const newTickers = new Map(state.tickers);
      newTickers.set(data.categoryId, data);
      return { tickers: newTickers };
    });
  },
  getTicker: (categoryId) => {
    const state = get();
    return state.tickers.get(categoryId) || null;
  },

  // Trades 초기값
  trades: [],
  addTrade: (data) =>
    set((state) => {
      const newTrades = [data, ...state.trades];
      // 최대 개수 제한
      const maxCount = state.maxTradesCount || 100;
      return {
        trades: newTrades.slice(0, maxCount),
      };
    }),
  clearTrades: () => set({ trades: [] }),
  maxTradesCount: 100,
  setMaxTradesCount: (count) => set({ maxTradesCount: count }),

  // Orderbook LastPrice 초기값
  orderbookLastPrice: null,
  updateOrderbookLastPrice: (data) => set({ orderbookLastPrice: data }),

  // Charts 초기값
  charts: [],
  addChart: (data) =>
    set((state) => {
      // 같은 시간의 캔들이 있으면 업데이트, 없으면 추가
      const existingIndex = state.charts.findIndex((c) => c.t === data.t);
      if (existingIndex >= 0) {
        const newCharts = [...state.charts];
        newCharts[existingIndex] = data;
        return { charts: newCharts };
      }
      // 시간순으로 정렬하여 추가
      const newCharts = [...state.charts, data].sort((a, b) => a.t - b.t);
      const maxCount = state.maxChartsCount || 200;
      return { charts: newCharts.slice(-maxCount) }; // 최신 N개만 유지
    }),
  updateChart: (data) =>
    set((state) => {
      const existingIndex = state.charts.findIndex((c) => c.t === data.t);
      if (existingIndex >= 0) {
        const newCharts = [...state.charts];
        newCharts[existingIndex] = data;
        return { charts: newCharts };
      }
      return state;
    }),
  clearCharts: () => set({ charts: [] }),
  maxChartsCount: 200,
  setMaxChartsCount: (count) => set({ maxChartsCount: count }),
}));

export default useMarketStore;
