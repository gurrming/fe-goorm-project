import { create } from 'zustand';
import type { TSummary, TWSAssets } from '../../types/asset';

interface IAssetStore {
  assetData: TWSAssets | null;
  summary: TSummary | null;
  setAssetData: (data: TWSAssets) => void;
  setSummary: (data: TSummary) => void;
}

export const useAssetStore = create<IAssetStore>((set) => ({
  assetData: null,
  summary: null,
  setAssetData: (data) => set({ assetData: data }),
  setSummary: (data) => set({ summary: data }),
}));
