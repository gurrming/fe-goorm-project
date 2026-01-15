import { useMutation, useQueryClient } from '@tanstack/react-query';
import { request } from '../common/axiosInstance';

const patchCancel = (orderId: number) => {
  return request<void>({
    method: 'PATCH',
    url: `/api/orders/${orderId}/cancel`,
  });
};

export const usePatchCancel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId }: { orderId: number }) => patchCancel(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['unsettled'] });
    },
    onError: (error) => {
      console.error('주문 취소 실패 : ', error);
    },
  });
};
