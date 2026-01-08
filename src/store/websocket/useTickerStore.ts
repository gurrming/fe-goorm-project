import { create } from 'zustand';
import type { TickerData } from '../../types/websocket';

interface TickerStore {
  /**
   * categoryId별 티커 데이터
   * - 마켓 테이블(여러 종목)에서 행별로 올바른 티커를 보여주기 위해 Map 형태로 저장합니다.
   */
  tickerByCategoryId: Record<number, TickerData | undefined>;
  setTickerData: (categoryId: number, data: TickerData) => void;
  clearTickerData: (categoryId?: number) => void; // categoryId 없으면 전체 삭제
}

export const useTickerStore = create<TickerStore>((set) => ({
  tickerByCategoryId: {},
  setTickerData: (categoryId, data) =>
    set((state) => ({
      tickerByCategoryId: {
        ...state.tickerByCategoryId,
        [categoryId]: data,
      },
    })),
  clearTickerData: (categoryId) =>
    set((state) => {
      if (categoryId !== undefined) {
        const next = { ...state.tickerByCategoryId };
        delete next[categoryId];
        return { tickerByCategoryId: next };
      }
      return { tickerByCategoryId: {} };
    }),
}));
