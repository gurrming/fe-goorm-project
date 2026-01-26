import { useMutation, useQueryClient } from '@tanstack/react-query';
import { request } from '../common/axiosInstance';
import type { TOrderRequest, TOrderResponse } from '../../types/order';

export const postOrder = (data: TOrderRequest)=> {
  return request<TOrderResponse>({
    method: 'POST',
    url: '/api/orders',
    data,
  });
};

export const usePostOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postOrder,
    onSuccess: (data, variables) => {
      // 주문 목록 갱신
      queryClient.invalidateQueries({ queryKey: ['orders', variables.memberId] });

      // 매수 시: 주문 가능 금액 감소 무효화
      queryClient.invalidateQueries({ queryKey: ['myAsset', variables.memberId] });
      // 매도 시: 종목 매도 주문 가능 감소 무효화
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
    },
  });
};
