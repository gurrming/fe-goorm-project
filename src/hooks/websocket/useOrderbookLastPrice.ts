import { useEffect } from 'react';
import { useOrderbookStore } from '../../store/websocket/useOrderbookStore';
import { useWebsocket } from '../useWebsocket';
import type { OrderbookLastPrice } from '../../types/websocket';

/**
 * /topic/orderbook/lastPrice/{categoryId} 구독 훅
 * 호가 테이블에 반영되는 체결가(검정 테두리) 데이터를 받아옵니다.
 * 받아온 데이터는 zustand store에 저장됩니다.
 */
export const useOrderbookLastPrice = (categoryId: number) => {
  const { isConnected, stompClientRef } = useWebsocket();
  const { setLastPrice, clearLastPrice } = useOrderbookStore();

  useEffect(() => {
    if (isConnected && stompClientRef.current && categoryId) {
      const subscription = stompClientRef.current.subscribe(`/topic/orderbook/lastPrice/${categoryId}`, (message) => {
        try {
          const data: OrderbookLastPrice = JSON.parse(message.body);
          setLastPrice(data);
        } catch (error) {
          console.error('[useOrderbookLastPrice] 데이터 파싱 에러:', error);
        }
      });

      return () => {
        subscription.unsubscribe();
        clearLastPrice();
      };
    }
  }, [isConnected, categoryId, setLastPrice, clearLastPrice, stompClientRef]);
};
