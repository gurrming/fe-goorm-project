import { useEffect } from 'react';
import useCategoryIdStore from '../../store/useCategoryId';
import { useTradesStore } from '../../store/websocket/useTradesStore';
import { useWebsocket } from '../useWebsocket';
import type { TradesData } from '../../types/websocket';

/**
 * /topic/trades/{categoryId} 구독 훅
 * 체결가(현재가), 체결량, 전일종가, buyTaker, 체결시간, 체결강도 데이터를 받아옵니다.
 * 받아온 데이터는 zustand store에 저장됩니다.
 */
export const useTrades = () => {
  const { isConnected, stompClientRef } = useWebsocket();
  const { addTrade } = useTradesStore();
  const categoryId = useCategoryIdStore((state) => state.categoryId);

  useEffect(() => {
    if (isConnected && stompClientRef.current && categoryId) {
      const topic = `/topic/trades/${categoryId}`;
      console.log('[useTrades] 구독 시작:', topic);

      const subscription = stompClientRef.current.subscribe(topic, (message) => {
        try {
          const data: TradesData = JSON.parse(message.body);
          // 최신 체결 + 체결 내역 리스트 누적
          addTrade(data);
        } catch (error) {
          console.error('[useTrades] 데이터 파싱 에러:', error);
        }
      });

      return () => {
        console.log('[useTrades] 구독 해제:', topic);
        subscription.unsubscribe();
      };
    }
  }, [isConnected, categoryId, addTrade, stompClientRef]);
};
