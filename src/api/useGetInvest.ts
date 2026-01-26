import { useQuery } from '@tanstack/react-query';
import { request } from './common/axiosInstance';
import useUserStore from '../store/useUserStore';
import type { TMyPortfolio } from '../types/asset';

export const getInvest = (memberId: number)=> {
  return request<TMyPortfolio>({
    method: 'GET',
    url: `/api/invest/summary?memberId=${memberId}`,
  });
};

export const useGetInvest = (memberId: number) => {
  const user = useUserStore((state) => state.user);
  const isLoggedIn = !!user;

  return useQuery({
    queryKey: ['invest', memberId],
    queryFn: () => getInvest(memberId!),
    enabled: isLoggedIn,
  });
};
