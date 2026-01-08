import { useEffect } from 'react';
import { useTradesStore } from '../../store/websocket/useTradesStore';
import { useWebsocket } from '../useWebsocket';
import type { TradesData } from '../../types/websocket';

/**
 * /topic/trades 구독 훅
 * 체결가(현재가), 체결량, 전일종가, buyTaker, 체결시간, 체결강도 데이터를 받아옵니다.
 * 받아온 데이터는 zustand store에 저장됩니다.
 */
export const useTrades = () => {
  const { isConnected, stompClientRef } = useWebsocket();
  const { setTradesData } = useTradesStore();

  useEffect(() => {
    if (isConnected && stompClientRef.current) {
      const subscription = stompClientRef.current.subscribe('/topic/trades', (message) => {
        try {
          const data: TradesData = JSON.parse(message.body);
          setTradesData(data);
        } catch (error) {
          console.error('[useTrades] 데이터 파싱 에러:', error);
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [isConnected, setTradesData]);
};
