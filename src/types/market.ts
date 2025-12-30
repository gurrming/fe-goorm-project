export type TabKey = 'krw' | 'holding' | 'like';

export type SortTable = 'lastPrice' | 'changeRate' | 'tradeAmount';

export type SortPriceArray = 'descending' | 'ascending' | 'none';

export type MarketItem = {
  id: number;
  symbol: string;
  name: string;
  quote: 'KRW';
  lastPrice: number;
  changeRate: number;
  tradeAmount: number;
  isFavorite: boolean;
};
