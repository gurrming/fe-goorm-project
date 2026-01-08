export type TOrderRequest = {
  memberId: number;
  categoryId: number;
  orderPrice: number;
  orderCount: number;
  orderType: 'BUY' | 'SELL';
};

export type TOrderResponse = {
  orderId: number;
  categoryId: number;
  symbol: string;
  categoryName: string;
  orderType: 'BUY' | 'SELL';
  orderStatus: 'OPEN' | 'CLOSED' | 'CANCELLED';
  orderPrice: number;
  orderCount: number;
  remainingCount: number;
  executedCount: number;
  totalAmount: number;
  orderTime: string;
};
