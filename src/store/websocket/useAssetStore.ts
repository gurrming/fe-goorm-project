import { create } from 'zustand';
import type { TMyPortfolio, TWSAssets } from '../../types/asset';

interface IAssetStore {
  assetData: TWSAssets | null;
  summary: TMyPortfolio | null;
  setAssetData: (data: TWSAssets) => void;
  setSummary: (data: TMyPortfolio) => void;
}

export const useAssetStore = create<IAssetStore>((set) => ({
  assetData: null,
  summary: null,
  setAssetData: (data) => set({ assetData: data }),
  setSummary: (data) => set({ summary: data }),
}));
