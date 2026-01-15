import { useQuery } from '@tanstack/react-query';
import { TOrderbookResponse, TOrderbookPageable } from '../../types/order';
import { request } from '../common/axiosInstance';

interface GetOrderbookParams {
  categoryId: number;
  orderType: 'BUY' | 'SELL';
  pageable: TOrderbookPageable;
}

const getOrderbook = ({ categoryId, orderType, pageable }: GetOrderbookParams): Promise<TOrderbookResponse[]> => {
  return request<TOrderbookResponse[]>({
    method: 'GET',
    url: `/api/orders/orderbook`,
    params: {
      categoryId,
      orderType,
      page: pageable.page,
      size: pageable.size,
      ...(pageable.sort && { sort: pageable.sort }),
    },
  });
};

export const useGetOrderbook = (
  categoryId: number,
  orderType: 'BUY' | 'SELL',
  pageable: TOrderbookPageable = { page: 0, size: 1 },
) => {
  return useQuery({
    queryKey: ['orderbook', categoryId, orderType, pageable],
    queryFn: () => getOrderbook({ categoryId, orderType, pageable }),
    enabled: categoryId > 0,
    // 초깃값 용도라 불필요한 재요청 방지 (이후 실시간 갱신은 WebSocket이 쏙)
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
