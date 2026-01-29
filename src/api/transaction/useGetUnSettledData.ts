import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import useUserStore from '../../store/useUserStore';
import { request } from '../common/axiosInstance';
import type { TUnSettledResponse } from '../../types/transaction';

export const getUnSettledData = (memberId: number, page: number, size: number) => {
  return request<TUnSettledResponse>({
    method: 'GET',
    url: `/api/orders/open?memberId=${memberId}&page=${page}&size=${size}`,
  });
};

export const useGetUnSettledData = (page: number, size: number): UseQueryResult<TUnSettledResponse, Error> => {
  const user = useUserStore((state) => state.user);
  const memberId = user?.id;
  const isLoggedIn = !!user;

  return useQuery<TUnSettledResponse, Error>({
    queryKey: ['unsettled'],
    queryFn: () => getUnSettledData(memberId!, page, size),
    enabled: isLoggedIn,
  });
};
