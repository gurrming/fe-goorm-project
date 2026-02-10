import { create } from 'zustand';
import type { TAssets } from '../../types/asset';

interface IAssetStore {
  myAsset: {
    assetCash: number | null;
    totalAsset: number | null;
    assetCanOrder: number | null;
  };
  wsAssetList: {
    categoryId: number;
    evaluationAmount: number;
    evaluationProfit: number;
  }[];
  summary: {
    totalBuyAmount: number;
    totalEvaluation: number;
    totalProfit: number;
    totalProfitRate: number;
  };
  assetList: TAssets[];
  setMyAsset: (data: { assetCash: number | null; totalAsset: number | null; assetCanOrder: number | null }) => void;
  setWsAssetList: (data: { categoryId: number; evaluationAmount: number; evaluationProfit: number }[]) => void;
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
  wsAssetList: [],
  summary: {
    totalBuyAmount: 0,
    totalEvaluation: 0,
    totalProfit: 0,
    totalProfitRate: 0,
  },
  assetList: [],
  setMyAsset: (data) => set({ myAsset: data }),
  setWsAssetList: (data) => set({ wsAssetList: data }),
  setSummary: (data) => set({ summary: data }),
  setAssetList: (data: TAssets[]) => set({ assetList: data }),
}));
