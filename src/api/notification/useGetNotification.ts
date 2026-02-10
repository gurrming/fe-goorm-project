import { useQuery } from '@tanstack/react-query';
import { request } from '../common/axiosInstance';
import type { TNotification } from '../../types/websocket';

export const getNotification = (memberId: number, lastNotiId?: number | null, size?: number) => {
  const lastIdParam = lastNotiId ?? '';
  const sizeParam = size ?? 10;
  return request<TNotification[]>({
    method: 'GET',
    url: `/api/notifications?memberId=${memberId}&lastNotiId=${lastIdParam}&size=${sizeParam}`,
  });
};

export const useGetNotification = (memberId: number, lastNotiId?: number, size?: number) => {
  return useQuery({
    queryKey: ['notification', memberId],
    queryFn: () => getNotification(memberId, lastNotiId, size),
  });
};
