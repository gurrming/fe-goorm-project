export type TSettledData = {
  orderTime: string;
  type: string;
  executionPrice: number;
  executionAmount: number;
  executionQuantity: number;
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
