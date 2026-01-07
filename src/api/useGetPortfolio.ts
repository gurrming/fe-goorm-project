import { useQuery } from '@tanstack/react-query';
import { request } from './common/axiosInstance';
import useUserStore from '../store/useUserStore';
import type { TMyPortfolio } from '../types/asset';

export const getPortfolio = (): Promise<TMyPortfolio> => {
  return request<TMyPortfolio>({
    method: 'GET',
    url: '/api/invest/portfolio',
  });
};

export const useGetPortfolio = () => {
  const user = useUserStore((state) => state.user);
  const isLoggedIn = !!user;

  return useQuery({
    queryKey: ['portfolio'],
    queryFn: () => getPortfolio(),
    enabled: isLoggedIn,
  });
};
