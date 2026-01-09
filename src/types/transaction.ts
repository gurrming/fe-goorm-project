export type TSettledData = {
  tradeId: number;
  tradeTime: string;
  tradePrice: number;
  tradeCount: number;
  tradeClosePrice: number;
  buyOrderId: number;
  sellOrderId: number;
  takerType: string;
  symbol: string;
};

export type TUnSettledData = {
  orderId: number;
  categoryId: number;
  symbol: string;
  categoryName: string;
  orderType: string;
  orderStatus: string;
  orderPrice: number;
  orderCount: number;
  remainingCount: number;
  executedCount: number;
  totalAmount: number;
  orderTime: string;
};
