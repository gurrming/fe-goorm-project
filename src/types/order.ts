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

// 호가창 단일 항목 타입 (API는 이 타입의 배열을 반환)
export type TOrderbookResponse = {
  orderPrice: number;
  totalRemainingCount: number;
};

export type TOrderbookPageable = {
  page: number;
  size: number;
  sort?: string[];
};

export type TIntensity = {
  intensity?: number;
};
