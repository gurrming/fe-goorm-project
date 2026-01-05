// 3️⃣ subscribeMarket.ts
// 🎯 한 줄 역할
// “이 topic 메시지를 받으면 → 이 store action을 실행해라”를 정의하는 연결 레이어

// 여기서만 하는 일
// /topic/ticker, /topic/trades 등 topic별 메시지 핸들러 정의

// raw STOMP 메시지 → JSON parse

// 필요한 형태로 정규화

// zustand store의 action 호출

// 📌 절대 하지 않는 일

// stomp 연결/해제 ❌

// state 구조 정의 ❌

// UI 렌더링 ❌

import { IMessage } from '@stomp/stompjs';
import { subscribeTopic } from './stompClient';
import { TOPICS } from './topics';

// 서버에서 받는 원시 데이터 타입 정의
export type TickerMessage = {
  categoryId: number; // 종목 ID
  price: number; // 체결가(현재가)
  changeRate: number; // 변동률
  changeAmount: number; // 변동금액
  high: number; // 당일고가
  low: number; // 당일저가
  volume: number; // 누적거래량
  amount: number; // 누적거래금
};

export type TradesMessage = {
  price: number; // 체결가(현재가)
  count: number; // 체결량
  openPrice: number; // 전일종가
  type: 'buy' | 'sell'; // buyTaker (매수/매도)
  time: number; // 체결시간
  intensity: number; // 체결강도
};

export type OrderbookLastPriceMessage = {
  price: number; // 호가 테이블에 반영되는 체결가
};

export type ChartsMessage = {
  t: number; // 캔들 생성 시간
  o: number; // 캔들 시가(굵은 몸통)
  h: number; // 캔들 고가(얇은선)
  l: number; // 캔들 저가(얇은선)
  c: number; // 캔들 종가(굵은 몸통)
};

// 메시지 핸들러 타입
type TickerHandler = (data: TickerMessage) => void;
type TradesHandler = (data: TradesMessage) => void;
type OrderbookLastPriceHandler = (data: OrderbookLastPriceMessage) => void;
type ChartsHandler = (data: ChartsMessage) => void;

/**
 * /topic/ticker 구독
 * 체결가, 변동률/변동금액, 고가/저가, 거래량/거래금 정보
 */
export function subscribeTicker(handler: TickerHandler) {
  subscribeTopic(TOPICS.TICKER, (message: IMessage) => {
    try {
      const data: TickerMessage = JSON.parse(message.body);
      handler(data);
    } catch (error) {
      console.error('Failed to parse ticker message:', error);
    }
  });
}

/**
 * /topic/trades 구독
 * 체결가, 체결량, 전일종가, buyTaker, 체결시간, 체결강도 정보
 */
export function subscribeTrades(handler: TradesHandler) {
  subscribeTopic(TOPICS.TRADES, (message: IMessage) => {
    try {
      const data: TradesMessage = JSON.parse(message.body);
      handler(data);
    } catch (error) {
      console.error('Failed to parse trades message:', error);
    }
  });
}

/**
 * /topic/orderbook/lastPrice 구독
 * 호가 테이블에 반영되는 체결가
 */
export function subscribeOrderbookLastPrice(handler: OrderbookLastPriceHandler) {
  subscribeTopic(TOPICS.ORDERBOOK_LAST_PRICE, (message: IMessage) => {
    try {
      const data: OrderbookLastPriceMessage = JSON.parse(message.body);
      handler(data);
    } catch (error) {
      console.error('Failed to parse orderbook lastPrice message:', error);
    }
  });
}

/**
 * /topic/charts 구독
 * 캔들 데이터 (시간, 시가, 고가, 저가, 종가)
 */
export function subscribeCharts(handler: ChartsHandler) {
  subscribeTopic(TOPICS.CHARTS, (message: IMessage) => {
    try {
      const data: ChartsMessage = JSON.parse(message.body);
      handler(data);
    } catch (error) {
      console.error('Failed to parse charts message:', error);
    }
  });
}
