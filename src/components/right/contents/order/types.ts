export type BuyOrderInitialData = {
  availableBalance: number;
  currentPrice: number;
  symbol: string;
};

export type SellOrderInitialData = {
  availableQuantity: number;
  symbol: string;
  currentPrice: number;
};
