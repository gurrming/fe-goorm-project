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
    set((state) => ({
      chartDataList: [...state.chartDataList, data],
    })),
  setChartData: (data) =>
    set((state) => ({
      chartDataList: [...state.chartDataList, ...data],
    })),
  clearChartDataList: () => set({ chartDataList: [] }),
}));
