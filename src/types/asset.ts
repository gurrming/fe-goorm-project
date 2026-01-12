export type TMyAsset = {
  assetCash: number;
  totalAsset: number;
};

export type TMyPortfolio = {
  totalBuyAmount: number;
  totalEvaluateAmount: number;
  totalProfit: number;
  totalProfitRate: number;
  assets: TAssets[];
};

export type TAssets = {
  categoryId: number;
  categoryName: string;
  symbol: string;
  quantity: number;
  avgBuyPrice: number;
  buyAmount: number;
  evaluateAmount: number;
  profit: number;
  profitRate: number;
};
export type TSummary = {
  totalBuyAmount: number;
  totalEvaluateAmount: number;
  totalProfit: number;
  totalProfitRate: number;
};

export type TWSAssets = {
  totalAsset: number;
};
