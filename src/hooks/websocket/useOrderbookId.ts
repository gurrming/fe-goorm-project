import { useEffect } from 'react';
import { useOrderbookStore } from '../../store/websocket/useOrderbookStore';
import { useWebsocket } from '../useWebsocket';
import type { OrderbookPayload } from '../../types/websocket';

/**
 * /topic/orderbook/{categoryId} 구독 훅
 * 특정 종목의 호가 데이터(매수/매도 호가, 서버 시간)를 받아옵니다.
 * 받아온 데이터는 zustand store에 저장됩니다.
 *
 * @param categoryId - 구독할 종목의 카테고리 ID
 */
export const useOrderbookId = (categoryId: number) => {
  const { isConnected, stompClientRef } = useWebsocket();
  const { setOrderbookData } = useOrderbookStore();

  useEffect(() => {
    if (isConnected && stompClientRef.current && categoryId) {
      const subscription = stompClientRef.current.subscribe(`/topic/orderbook/${categoryId}`, (message) => {
        try {
          const data: OrderbookPayload = JSON.parse(message.body);
          setOrderbookData(categoryId, data);
        } catch (error) {
          console.error('[useOrderbookId] 데이터 파싱 에러:', error);
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [isConnected, stompClientRef, categoryId, setOrderbookData]);
};
