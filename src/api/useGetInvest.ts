import { useQuery } from '@tanstack/react-query';
import { request } from './common/axiosInstance';
import useUserStore from '../store/useUserStore';
import type { TMyPortfolio } from '../types/asset';

export const getInvest = (memberId: number, page?: number, size?: number) => {
  return request<TMyPortfolio>({
    method: 'GET',
    url: `/api/invest/summary?memberId=${memberId}&page=${page}&size=${size}`,
  });
};

export const useGetInvest = (memberId: number, page: number, size: number) => {
  const user = useUserStore((state) => state.user);
  const isLoggedIn = !!user;

  return useQuery({
    queryKey: ['invest', memberId],
    queryFn: () => getInvest(memberId!, page, size),
    enabled: isLoggedIn,
  });
};
