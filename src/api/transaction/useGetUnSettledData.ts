import { useQuery } from '@tanstack/react-query';
import useUserStore from '../../store/useUserStore';
import { request } from '../common/axiosInstance';
import type { TUnSettledData } from '../../types/transaction';

export const getUnSettledData = (memberId: number, page: number, size: number)=> {
  return request<TUnSettledData[]>({
    method: 'GET',
    url: `/api/orders/open?memberId=${memberId}&page=${page}&size=${size}`,
  });
};

export const useGetUnSettledData = (page: number, size: number) => {
  const user = useUserStore((state) => state.user);
  const memberId = user?.id;
  const isLoggedIn = !!user;

  return useQuery({
    queryKey: ['unsettled'],
    queryFn: () => getUnSettledData(memberId!, page, size),
    enabled: isLoggedIn,
  });
};
