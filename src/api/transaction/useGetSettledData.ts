import { useQuery } from '@tanstack/react-query';
import useUserStore from '../../store/useUserStore';
import { request } from '../common/axiosInstance';
import type { TSettledData } from '../../types/transaction';

export const getSettledData = (memberId: number, page?: number, size?: number)=> {
  return request<TSettledData[]>({
    method: 'GET',
    url: `/api/trades/my?memberId=${memberId}&page=${page}&size=${size}`,
  });
};

export const useGetSettledData = (page?: number, size?: number) => {
  const user = useUserStore((state) => state.user);
  const memberId = user?.id;
  const isLoggedIn = !!user;

  return useQuery({
    queryKey: ['settled'],
    queryFn: () => getSettledData(memberId!, page, size),
    enabled: isLoggedIn,
  });
};
