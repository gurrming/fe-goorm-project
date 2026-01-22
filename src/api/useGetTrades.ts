import { useQuery } from '@tanstack/react-query';
import { request } from './common/axiosInstance';
import type { TTrade } from '../types/transaction';


export const getTrades = (categoryId: number, limit: number = 20)=> {
  return request<TTrade>({
    method: 'GET',
    url: `/api/trades?categoryId=${categoryId}&limit=${limit}`,
  });
};

export const useGetTrades = (categoryId: number, limit: number = 20) => {
    return useQuery<TTrade>({
      queryKey: ['trades', categoryId, limit],
      queryFn: () => getTrades(categoryId, limit),
    });
  };