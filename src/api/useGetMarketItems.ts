import { useQuery } from '@tanstack/react-query';
import { request } from './common/axiosInstance';
import type { Category } from '../types/market';

export const getMarketItems = (): Promise<Category[]> => {
  return request<Category[]>({
    method: 'GET',
    url: '/api/categories',
  });
};

export const useGetMarketItems = () => {
  return useQuery({
    queryKey: ['marketItems'],
    queryFn: () => getMarketItems(),
  });
};
