import { useEffect } from 'react';
import { useChartStore } from '../../store/websocket/useChartStore';
import { useWebsocket } from '../useWebsocket';
import type { ChartData } from '../../types/websocket';

export const useChart = (categoryId: number) => {
  const { isConnected, stompClientRef } = useWebsocket();
  const { setChartData, clearChartData } = useChartStore();

  // categoryId가 변경되면 기존 데이터 초기화
  useEffect(() => {
    clearChartData();
  }, [categoryId, clearChartData]);

  useEffect(() => {
    if (isConnected && stompClientRef.current && categoryId) {
      const subscription = stompClientRef.current.subscribe(`/topic/chart/${categoryId}`, (message) => {
        try {
          const data: ChartData = JSON.parse(message.body);
          // 함수형 업데이트로 클로저 문제 해결
          setChartData((prev) => [...(prev || []), data]);
        } catch (error) {
          console.error('[useChart] 데이터 파싱 에러:', error);
        }
      });
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [isConnected, categoryId, setChartData]);
};
