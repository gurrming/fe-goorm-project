import { useQuery } from '@tanstack/react-query';
import { request } from '../common/axiosInstance';
import type { TNotification } from '../../types/websocket';



export const getNotification = (memberId: number) => {
  return request<TNotification[]>({
    method: 'GET',
    url: `/api/notifications?memberId=${memberId}`,
  });
};

export const useGetNotification = (memberId: number) => {
  return useQuery({
    queryKey: ['notification', memberId],
    queryFn: () => getNotification(memberId),
  });
};
