import { useEffect } from 'react';
import { useTickerStore } from '../../store/websocket/useTickerStore';
import { useWebsocket } from '../useWebsocket';
import type { TickerData } from '../../types/websocket';

/**
 * /topic/ticker 구독 훅
 * 체결가(현재가), 변동률/변동금액, 당일고가/저가, 누적거래량/거래금 데이터를 받아옵니다.
 * 받아온 데이터는 zustand store에 저장됩니다.
 */
export const useTicker = () => {
  const { isConnected, stompClientRef } = useWebsocket();
  const { setTickerData } = useTickerStore();

  useEffect(() => {
    if (isConnected && stompClientRef.current) {
      const subscription = stompClientRef.current.subscribe('/topic/ticker', (message) => {
        try {
          const data: TickerData = JSON.parse(message.body);
          setTickerData(data);
        } catch (error) {
          console.error('[useTicker] 데이터 파싱 에러:', error);
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [isConnected, stompClientRef, setTickerData]);
};
