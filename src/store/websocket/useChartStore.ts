import { create } from 'zustand';
import type { ChartData } from '../../types/websocket';

interface ChartStore {
  chartData: ChartData | null;
  chartDataList: ChartData[];
  addChartData: (data: ChartData) => void;
  setChartData: (data: ChartData) => void;
  clearChartData: () => void;
  clearChartDataList: () => void;
}

export const useChartStore = create<ChartStore>((set) => ({
  chartData: null,
  chartDataList: [],
  addChartData: (data) =>
    set((state) => ({
      chartData: data,
      chartDataList: [data, ...(state.chartDataList || [])].slice(0, 30),
    })),
  setChartData: (data) =>
    set((state) => ({
      chartData: data,
      chartDataList: [data, ...(state.chartDataList || [])].slice(0, 30),
    })),
  clearChartData: () => set({ chartData: null }),
  clearChartDataList: () => set({ chartDataList: [] }),
}));
