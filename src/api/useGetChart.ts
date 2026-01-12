import { useQuery } from '@tanstack/react-query';
import { request } from './common/axiosInstance';
import type { ChartData } from '../types/websocket';

const getChart = (categoryId: number): Promise<ChartData[]> => {
  return request<ChartData[]>({
    method: 'GET',
    url: `/api/trades/chart?categoryId=${categoryId}`,
  });
};

export const useGetChart = (categoryId: number) => {
  return useQuery({
    queryKey: ['chart', categoryId],
    queryFn: () => getChart(categoryId),
  });
};
