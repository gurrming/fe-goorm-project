import { useQuery } from '@tanstack/react-query';
import useUserStore from '../../store/useUserStore';
import { request } from '../common/axiosInstance';
import type { TUnSettledData } from '../../types/transaction';

const getUnSettledData = (memberId: number): Promise<TUnSettledData[]> => {
  return request<TUnSettledData[]>({
    method: 'GET',
    url: `/api/orders/open?memberId=${memberId}`,
  });
};

export const useGetUnSettledData = () => {
  const user = useUserStore((state) => state.user);
  const memberId = user?.id;
  const isLoggedIn = !!user;

  return useQuery({
    queryKey: ['unsettled'],
    queryFn: () => getUnSettledData(memberId!),
    enabled: isLoggedIn,
  });
};
