import { useQuery } from '@tanstack/react-query';
import { request } from './common/axiosInstance';
import type { ChartData } from '../types/websocket';

const getChart = (categoryId: number, page: number, size: number): Promise<ChartData[]> => {
  return request<ChartData[]>({
    method: 'GET',
    url: `/api/trades/chart?categoryId=${categoryId}&page=${page}&size=${size}`,
  });
};

export const useGetChart = (categoryId: number, page: number, size: number) => {
  return useQuery({
    queryKey: ['chart', categoryId],
    queryFn: () => getChart(categoryId, page, size),
  });
};
