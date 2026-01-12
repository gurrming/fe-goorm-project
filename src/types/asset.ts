export type TMyAsset = {
  assetCash: number;
  totalAsset: number;
};

export type TMyPortfolio = {
  totalBuyAmount: number;
  totalEvaluateAmount: number;
  totalProfit: number;
  totalProfitRate: number;
  assetList: TAssets[];
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

export type TWSAssets = {
  evaluateAmount: number;
  profit: number;
};
