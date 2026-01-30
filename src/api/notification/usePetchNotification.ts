import { useMutation, useQueryClient } from '@tanstack/react-query';
import { request } from '../common/axiosInstance';

const patchNotification = (notificationId: number) => {
  return request<void>({
    method: 'PATCH',
    url: `/api/notifications/${notificationId}/read`,
  });
};

const patchAllNotification = (memberId: number) => {
  return request<void>({
    method: 'PATCH',
    url: `/api/notifications/read-all?memberId=${memberId}`,
  });
};

export const usePatchNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ notificationId }: { notificationId: number }) => patchNotification(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notification'] });
    },
    onError: (error) => {
      console.error('알림 읽음 처리 실패 : ', error);
    },
  });
};

export const usePatchAllNotification = (memberId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => patchAllNotification(memberId!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notification', memberId] });
    },
    onError: (error) => {
      console.error('알림 읽음 처리 실패 : ', error);
    },
  });
};