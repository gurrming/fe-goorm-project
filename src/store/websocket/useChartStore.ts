import { create } from 'zustand';
import type { ChartData } from '../../types/websocket';

interface ChartStore {
  chartDataList: ChartData[];
  addChartData: (data: ChartData) => void;
  setChartData: (data: ChartData[]) => void;
  clearChartDataList: () => void;
}

export const useChartStore = create<ChartStore>((set) => ({
  chartDataList: [],
  addChartData: (data) =>
    set((state) => {
      // 중복 체크: 같은 시간(t)의 데이터가 이미 있으면 업데이트, 없으면 추가
      const existingIndex = state.chartDataList.findIndex((item) => item.t === data.t);
      if (existingIndex >= 0) {
        const newList = [...state.chartDataList];
        newList[existingIndex] = data;
        return { chartDataList: newList };
      }
      return {
        chartDataList: [...state.chartDataList, data],
      };
    }),
  setChartData: (data) =>
    set(() => ({
      // 초기 데이터 설정 시 기존 데이터를 덮어쓰기
      chartDataList: data,
    })),
  clearChartDataList: () => set({ chartDataList: [] }),
}));
