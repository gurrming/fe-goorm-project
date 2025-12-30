import axios from 'axios';
import type { TDayData } from '../types/upBit';

const baseUrl = 'https://api.upbit.com/v1/candles/days';
const options = { method: 'GET', headers: { accept: 'application/json' } };

const getUpBit = async (market: string, count: number): Promise<TDayData[]> => {
  const response = await axios.get<TDayData[]>(`${baseUrl}?market=${market}&count=${count}`, options);
  return response.data;
};

export default getUpBit;
