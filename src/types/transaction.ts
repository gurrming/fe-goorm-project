export type TSettledData = {
  tradeId: number;
  tradeTime: string;
  tradePrice: number;
  tradeCount: number;
  tradeClosePrice: number;
  buyOrderId: number;
  sellOrderId: number;
  takerType: string;
};

export type TUnSettledData = {
  orderTime: string;
  type: string;
  watchPrice: number;
  watchAmount: number;
  watchQuantity: number;
  unSettledPrice: number;
  unSettledAmount: number;
  unSettledQuantity: number;
};
