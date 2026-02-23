import { useEffect } from 'react';
import useCategoryIdStore from '../../store/useCategoryId';
import { useTradesStore } from '../../store/websocket/useTradesStore';
import { useWebsocket } from '../useWebsocket';
import type { TradesData } from '../../types/websocket';

/**
 * /topic/trades/{categoryId} 구독 훅
 * 체결가, 체결량, 전일종가, type(BUY/SELL), 체결시간, 체결강도 데이터
 * 받아온 데이터는 zustand store에 저장됩니다.
 */
export const useTrades = () => {
  const { isConnected, stompClientRef } = useWebsocket();
  const { addTrade, clearTradesList, clearTradesData } = useTradesStore();
  const categoryId = useCategoryIdStore((state) => state.categoryId);

  // categoryId 변경 시 기존 데이터 초기화
  useEffect(() => {
    clearTradesList();
    clearTradesData();
  }, [categoryId, clearTradesList, clearTradesData]);

  useEffect(() => {
    if (isConnected && stompClientRef.current && categoryId) {
      const topic = `/topic/trades/${categoryId}`;

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
        subscription.unsubscribe();
      };
    }
  }, [isConnected, categoryId, addTrade, stompClientRef]);
};
