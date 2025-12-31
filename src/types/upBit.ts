import type { Time } from 'lightweight-charts';

export type TUpBitData = {
  market: string;
  candle_date_time_utc: string;
  candle_date_time_kst: string;
  opening_price: number;
  high_price: number;
  low_price: number;
  trade_price: number;
  timestamp: number;
  candle_acc_trade_price: number;
  candle_acc_trade_volume: number;
};

export type TDayData = TUpBitData & {
  prev_closing_price: number;
  change_price: number;
  change_rate: number;
};

export type TMinuteData = TUpBitData & {
  unit: number;
};

export type TLightweightChartsData = {
  time: Time;
  open: number;
  high: number;
  low: number;
  close: number;
};
