// WebSocket 메시지 타입 정의

// /topic/ticker
export type TickerData = {
  price: number; // 체결가(현재가)
  changeRate: number; // 변동률
  changeAmount: number; // 변동금액
  high: number; // 당일고가
  low: number; // 당일저가
  volume: number; // 누적거래량
  amount: number; // 거래금
};

// /topic/trades
export type TradesData = {
  price: number; // 체결가(현재가)
  count: number; // 체결량
  openPrice: number; // 전일종가
  buyTaker: boolean; // type (true: 매수, false: 매도)
  time: number; // 체결시간
  intensity: number; // 체결강도
};

// /topic/orderbook/lastPrice
export type OrderbookLastPrice = {
  price: number; // 호가 테이블에 반영되는 체결가 (검정 테두리)
};

// /topic/orderbook/{categoryId}
export type OrderbookItemData = {
  orderPrice: number;
  totalRemainingCount: number;
};

export type OrderbookPayload = {
  categoryId: number;
  buySide: OrderbookItemData[]; // 매수 호가
  sellSide: OrderbookItemData[]; // 매도 호가
  serverTime: number; // 서버 시간
};

//topic/chart/{categoryId}
export type RawChartData = {
  t: number;
  o: string;
  h: string;
  l: string;
  c: string;
};
export type ChartData = {
  t: number;
  o: number;
  h: number;
  l: number;
  c: number;
};
