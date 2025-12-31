import axios from 'axios';
import type { TDayData, TMinuteData } from '../types/upBit';

const baseUrl = 'https://api.upbit.com/v1/candles/days';
const baseUrlMinute = 'https://api.upbit.com/v1/candles/minutes/1';
const options = { method: 'GET', headers: { accept: 'application/json' } };

const getUpBit = async (market: string, count: number): Promise<TDayData[]> => {
  const response = await axios.get<TDayData[]>(`${baseUrl}?market=${market}&count=${count}`, options);
  return response.data;
};

const getUpBitMinute = async (market: string, count: number): Promise<TMinuteData[]> => {
  const response = await axios.get<TMinuteData[]>(`${baseUrlMinute}?market=${market}&count=${count}`, options);
  return response.data;
};

export { getUpBit, getUpBitMinute };
