export type TabKey = 'krw' | 'holding' | 'interest';

export type SortTable = 'lastPrice' | 'changeRate' | 'tradeAmount' | 'evaluateAmount' | 'avgBuyPrice' | 'profitRate';

export type SortPriceArray = 'descending' | 'ascending' | 'none';

export type Category = {
  categoryId: number;
  categoryName: string;
  symbol: string;
};

export type PortfolioAsset = {
  categoryId: number;
  categoryName: string;
  symbol: string;
  quantity: number;
  avgBuyPrice: number;
  buyAmount: number;
  evaluateAmount: number;
  profit: number;
  profitRate?: number;
};

export type PortfolioSummary = {
  totalBuyAmount: number;
  totalEvaluateAmount: number;
  totalProfit: number;
  totalProfitRate: number;
};

export type Portfolio = {
  summary: PortfolioSummary;
  assets: PortfolioAsset[];
};

// 현재 목데이터에서 사용.. 추후 삭제될듯
export type MarketItem = {
  id: number;
  symbol: string;
  name: string;
  lastPrice?: number;
  changeRate?: number;
  tradeAmount?: number;
  isFavorite: boolean;
};
