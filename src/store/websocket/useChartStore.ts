import { create } from 'zustand';
import type { ChartData } from '../../types/websocket';

interface ChartStore {
  chartData: ChartData[] | null;
  setChartData: (data: ChartData[] | ((prev: ChartData[] | null) => ChartData[])) => void;
  clearChartData: () => void;
}

export const useChartStore = create<ChartStore>((set) => ({
  chartData: null,
  setChartData: (data) =>
    set((state) => ({
      chartData: typeof data === 'function' ? data(state.chartData) : data,
    })),
  clearChartData: () => set({ chartData: null }),
}));
