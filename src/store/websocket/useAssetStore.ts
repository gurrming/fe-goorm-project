import { create } from 'zustand';
import type { TAssets } from '../../types/asset';

interface IAssetStore {
  myAsset: {
    assetCash: number | null;
    totalAsset: number | null;
    assetCanOrder: number | null;
  };
  wsTotalAsset: number | null;
  summary: {
    totalBuyAmount: number;
    totalEvaluation: number;
    totalProfit: number;
    totalProfitRate: number;
  };
  assetList: TAssets[];
  setMyAsset: (data: { assetCash: number | null; totalAsset: number | null; assetCanOrder: number | null }) => void;
  setWsTotalAsset: (data: number | null) => void;
  setSummary: (data: {
    totalBuyAmount: number;
    totalEvaluation: number;
    totalProfit: number;
    totalProfitRate: number;
  }) => void;
  setAssetList: (data: TAssets[]) => void;
}

export const useAssetStore = create<IAssetStore>((set) => ({
  myAsset: {
    assetCash: null,
    totalAsset: null,
    assetCanOrder: null,
  },
  wsTotalAsset: null,
  summary: {
    totalBuyAmount: 0,
    totalEvaluation: 0,
    totalProfit: 0,
    totalProfitRate: 0,
  },
  assetList: [],
  setMyAsset: (data) => set({ myAsset: data }),
  setWsTotalAsset: (data) => set({ wsTotalAsset: data }),
  setSummary: (data) => set({ summary: data }),
  setAssetList: (data: TAssets[]) => set({ assetList: data }),
}));
