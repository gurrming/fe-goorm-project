// STOMP destination 문자열을 중앙에서 관리하는 파일

// src/lib/realtime/topics.ts
export const TOPICS = {
  TICKER: '/topic/ticker',
  TRADES: '/topic/trades',
  ORDERBOOK_LAST_PRICE: '/topic/orderbook/lastPrice',
  CHARTS: '/topic/charts',
} as const;

export type TopicKey = keyof typeof TOPICS;
export type TopicValue = (typeof TOPICS)[TopicKey];
