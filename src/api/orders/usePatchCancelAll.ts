import { useMutation, useQueryClient } from '@tanstack/react-query';
import { request } from '../common/axiosInstance';

const patchCancelAll = (memberId: number) => {
  return request<void>({
    method: 'PATCH',
    url: `/api/orders/cancel-all?memberId=${memberId}`,
  });
};

export const usePatchCancelAll = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ memberId }: { memberId: number }) => patchCancelAll(memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (error) => {
      console.error('주문 취소 실패 : ', error);
    },
  });
};
