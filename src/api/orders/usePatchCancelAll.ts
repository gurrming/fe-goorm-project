import { useMutation, useQueryClient } from '@tanstack/react-query';
import useUserStore from '../../store/useUserStore';
import { request } from '../common/axiosInstance';

const patchCancelAll = (memberId: number) => {
  return request<void>({
    method: 'PATCH',
    url: `/api/orders/cancel-all?memberId=${memberId}`,
  });
};

export const usePatchCancelAll = () => {
  const queryClient = useQueryClient();
  const memberId = useUserStore((state) => state.user?.id);

  return useMutation({
    mutationFn: () => patchCancelAll(memberId!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['unsettled'] });
    },
    onError: (error) => {
      console.error('주문 취소 실패 : ', error);
    },
  });
};
