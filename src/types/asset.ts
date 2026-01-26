export type TMyAsset = {
  assetCash: number;
  totalAsset: number;
  assetCanOrder: number;
};

export type TMyPortfolio = {
  totalBuyAmount: number;
  totalEvaluation: number;
  totalProfit: number;
  totalProfitRate: number;
  assetList: TAssets[];
};

export type TAssets = {
  categoryId: number;
  avgPrice: number;
  categoryName: string;
  symbol: string;
  investCount: number;
  currentPrice: number;
  buyAmount: number;
  evaluationAmount: number;
  evaluationProfit: number;
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
