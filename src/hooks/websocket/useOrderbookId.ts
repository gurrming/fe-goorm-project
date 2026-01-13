import { useEffect } from 'react';
import { useGetOrderbook } from '../../api/orders/useGetOrderbook';
import { useOrderbookStore } from '../../store/websocket/useOrderbookStore';
import { useWebsocket } from '../useWebsocket';
import type { OrderbookPayload, OrderbookItemData } from '../../types/websocket';

/**
 * /topic/orderbook/{categoryId} 구독 훅
 * REST API로 초기값을 가져와서 스토어에 설정하고,
 * 웹소켓으로 실시간 업데이트합니다.
 *
 * @param categoryId - 구독할 종목의 카테고리 ID
 */

export const useOrderbookId = (categoryId: number) => {
  const { isConnected, stompClientRef } = useWebsocket();
  const { setOrderbookData } = useOrderbookStore();
  const orderbookSocketData = useOrderbookStore((state) => state.orderbookData[categoryId]);
  const { data: buySideApi } = useGetOrderbook(categoryId, 'BUY', { page: 0, size: 30 });
  const { data: sellSideApi } = useGetOrderbook(categoryId, 'SELL', { page: 0, size: 30 });

  // REST API로 초기 스냅샷 용도
  useEffect(() => {
    if (!categoryId) return;
    // 이미 WebSocket으로 데이터가 들어왔다면 API로 덮어쓰지 않음
    if (orderbookSocketData && (orderbookSocketData.buySide?.length || orderbookSocketData.sellSide?.length)) return;

    if (buySideApi && sellSideApi) {
      setOrderbookData(categoryId, {
        categoryId,
        buySide: buySideApi as OrderbookItemData[],
        sellSide: sellSideApi as OrderbookItemData[],
      });
    }
  }, [categoryId, buySideApi, sellSideApi, setOrderbookData, orderbookSocketData]);

  // setOrderbookData로 최신 스냅샷으로 교체하는 용도
  useEffect(() => {
    if (isConnected && stompClientRef.current && categoryId) {
      const subscription = stompClientRef.current.subscribe(`/topic/orderbook/${categoryId}`, (message) => {
        try {
          const wsMessage = JSON.parse(message.body);

          if (Array.isArray(wsMessage.buySide) && Array.isArray(wsMessage.sellSide)) {
            setOrderbookData(categoryId, {
              categoryId: wsMessage.categoryId || categoryId,
              buySide: wsMessage.buySide,
              sellSide: wsMessage.sellSide,
            } satisfies OrderbookPayload);
          }
        } catch (error) {
          console.error('useOrderbookId', error);
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [isConnected, categoryId, setOrderbookData, stompClientRef]);
};
