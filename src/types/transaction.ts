export type TSettledData = {
  tradeId: number;
  tradeTime: string;
  tradePrice: number;
  tradeCount: number;
  tradeClosePrice: number;
  buyOrderId: number;
  sellOrderId: number;
  takerType: string;
  myOrderType: string;
  symbol: string;
};

export type TTrade = {
  tradeId: number;
  symbol: string;
  tradeTime: string;
  tradePrice: number;
  tradeCount: number;
  tradeClosePrice: number;
  buyOrderId: number;
  sellOrderId: number;
  takerType: string;
  myOrderType: string;
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

export type TUnSettledResponse = {
  orders: {
    content: TUnSettledData[];
    last: boolean;      // 마지막 페이지 여부
    number: number;     // 현재 페이지 번호
    pageable:{
      offset: number;
      pageSize: number; // 전체 페이지 수
      pageNumber: number; // 현재 페이지 번호
      paged: boolean;
      sort: {
        sorted: boolean;
        unsorted: boolean;
        empty: boolean;
      };
      unpaged: boolean;
    };
    size: number;
  };
  totalOpenOrderCount: number;
};
