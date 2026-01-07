import { create } from 'zustand';
import type { ChartData } from '../../types/websocket';

interface ChartStore {
  chartData: ChartData[] | null;
  setChartData: (data: ChartData[]) => void;
  clearChartData: () => void;
}

export const useChartStore = create<ChartStore>((set) => ({
  chartData: null,
  setChartData: (data) => set({ chartData: data }),
  clearChartData: () => set({ chartData: null }),
}));
