import type { BuyOrderInitialData, SellOrderInitialData } from './types';

// 매수 목데이터
export const mockBuyOrderInitial: BuyOrderInitialData = {
  availableBalance: 10000000,
  currentPrice: 10.5,
  symbol: 'BTC',
};

// 매도 목데이터
export const mockSellOrderInitial: SellOrderInitialData = {
  availableQuantity: 2.5,
  symbol: 'BTC',
  currentPrice: 131209000,
};
