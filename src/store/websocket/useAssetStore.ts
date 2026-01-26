import { create } from 'zustand';
import type { TMyPortfolio } from '../../types/asset';

interface IAssetStore {
  myAsset:{
    assetCash: number | null;
    totalAsset: number | null;
    assetCanOrder: number | null;
  },
  wsTotalAsset: number | null;
  summary: TMyPortfolio | null;
  setMyAsset: (data: { assetCash: number | null; totalAsset: number | null; assetCanOrder: number | null }) => void;
  setWsTotalAsset: (data: number | null) => void;
  setSummary: (data: TMyPortfolio) => void;
}

export const useAssetStore = create<IAssetStore>((set) => ({
  myAsset: {
    assetCash: null,
    totalAsset: null,
    assetCanOrder: null,
  },
  wsTotalAsset: null,
  summary: null,
  setMyAsset: (data) => set({ myAsset: data }),
  setWsTotalAsset: (data) => set({ wsTotalAsset: data }),
  setSummary: (data) => set({ summary: data }),
}));
