import { useQuery } from '@tanstack/react-query';
import { request } from './common/axiosInstance';
import type { Portfolio } from '../types/market';

export const getPortfolio = (): Promise<Portfolio> => {
  return request<Portfolio>({
    method: 'GET',
    url: '/api/invest/portfolio',
  });
};

export const useGetPortfolio = () => {
  return useQuery({
    queryKey: ['portfolio'],
    queryFn: () => getPortfolio(),
  });
};
