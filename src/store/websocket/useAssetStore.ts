import { create } from 'zustand';
import type { TMyPortfolio } from '../../types/asset';

interface IAssetStore {
  assetCash: number | null;
  totalAsset: number | null;
  wsTotalAsset: number | null;
  summary: TMyPortfolio | null;
  setAssetCash: (data: number | null) => void;
  setTotalAsset: (data: number | null) => void;
  setWsTotalAsset: (data: number | null) => void;
  setSummary: (data: TMyPortfolio) => void;
}

export const useAssetStore = create<IAssetStore>((set) => ({
  assetCash: null,
  totalAsset: null,
  wsTotalAsset: null,
  summary: null,
  setAssetCash: (data) => set({ assetCash: data }),
  setTotalAsset: (data) => set({ totalAsset: data }),
  setWsTotalAsset: (data) => set({ wsTotalAsset: data }),
  setSummary: (data) => set({ summary: data }),
}));
