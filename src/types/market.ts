export type TabKey = 'krw' | 'holding' | 'interest';

export type SortTable = 'lastPrice' | 'changeRate' | 'tradeAmount';

export type SortPriceArray = 'descending' | 'ascending' | 'none';

export type Category = {
  categoryId: number;
  categoryName: string;
  categorySymbol: string;
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
