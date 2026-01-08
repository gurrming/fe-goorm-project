import { create } from 'zustand';
import type { TAssets, TSummary } from '../../types/asset';

interface IAssetStore {
  assetData: TAssets | null;
  summary: TSummary | null;
  setAssetData: (data: TAssets) => void;
  setSummary: (data: TSummary) => void;
}

export const useAssetStore = create<IAssetStore>((set) => ({
  assetData: null,
  summary: null,
  setAssetData: (data) => set({ assetData: data }),
  setSummary: (data) => set({ summary: data }),
}));
