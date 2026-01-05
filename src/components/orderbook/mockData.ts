import type { OrderBookItemData } from './OrderBookItem';

// 매도 호가 목 데이터 (가격이 높은 순서)
export const mockAskData: OrderBookItemData[] = Array.from({ length: 20 }, (_, i) => {
  const basePrice = 97.2;
  const price = basePrice - i * 0.1;
  const volume = Math.random() * 200000 + 1000;
  const changeRate = ((i * 0.1) / basePrice) * 100;

  return {
    price,
    volume,
    changeRate,
  };
});

// 매수 호가 목 데이터 (가격이 낮은 순서)
export const mockBidData: OrderBookItemData[] = Array.from({ length: 30 }, (_, i) => {
  const basePrice = 93.0;
  const price = basePrice + i * 0.1;
  const volume = Math.random() * 200000 + 1000;
  const changeRate = (-((30 - i) * 0.1) / 97.2) * 100;

  return {
    price: Number(price.toFixed(1)),
    volume: Number(volume.toFixed(3)),
    changeRate: Number(changeRate.toFixed(2)),
  };
});

// 현재 거래 정보 데이터 타입
export type CurrentTradeData = {
  previousClose: number; // 전일종가
  todayHigh: number; // 당일고가
  todayLow: number; // 당일저가
};

// 현재 거래 정보 목 데이터
export const mockCurrentTradeData: CurrentTradeData = {
  previousClose: 6320000, // 전일종가
  todayHigh: 6358000, // 당일고가
  todayLow: 6303000, // 당일저가
};

// 체결 내역 데이터 타입
export type TradeTapeItem = {
  price: number; // 체결가
  amount: number; // 체결액
  isBuy: boolean; // 매수(true) 또는 매도(false)
};

// 체결강도 데이터 타입
export type TradeStrength = {
  value: number; // 체결강도 값 (퍼센트)
};

// 체결 내역 목 데이터
export const mockTradeTapeData: TradeTapeItem[] = [
  { price: 6347000, amount: 80383, isBuy: true },
  { price: 6353000, amount: 317006, isBuy: false },
  { price: 6353000, amount: 20000, isBuy: false },
  { price: 6353000, amount: 3808200, isBuy: true },
  { price: 6354000, amount: 808600, isBuy: false },
  { price: 6355000, amount: 1444511, isBuy: false },
  { price: 6355000, amount: 15526843, isBuy: true },
  { price: 6347000, amount: 4215539, isBuy: false },
  { price: 6347000, amount: 6347000, isBuy: true },
  { price: 6355000, amount: 1748645, isBuy: false },
  { price: 6355000, amount: 9066499, isBuy: true },
  { price: 6355000, amount: 4248302, isBuy: false },
  { price: 6347000, amount: 795409, isBuy: true },
  { price: 6355000, amount: 358052, isBuy: false },
  { price: 6347000, amount: 252766, isBuy: true },
  { price: 6355000, amount: 1064052, isBuy: false },
  { price: 6347000, amount: 31765, isBuy: true },
  { price: 6347000, amount: 31765, isBuy: true },
];
