import { useEffect } from 'react';
import { useOrderbookStore } from '../../store/websocket/useOrderbookStore';
import { useWebsocket } from '../useWebsocket';
import type { OrderbookLastPrice } from '../../types/websocket';

export const useOrderbookLastPrice = (categoryId: number) => {
  const { isConnected, stompClientRef } = useWebsocket();
  const { setLastPrice, clearLastPrice } = useOrderbookStore();

  useEffect(() => {
    if (isConnected && stompClientRef.current && categoryId) {
      const subscription = stompClientRef.current.subscribe(`/topic/orderbook/lastPrice/${categoryId}`, (message) => {
        try {
          const data = JSON.parse(message.body);
          const rawPrice = data.price;
          const price = typeof rawPrice === 'number' ? rawPrice : Number(rawPrice);
          if (!Number(price)) return;
          setLastPrice({ price } as OrderbookLastPrice);
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
