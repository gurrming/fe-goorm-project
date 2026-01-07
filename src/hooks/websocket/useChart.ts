import { useEffect } from 'react';
import { useChartStore } from '../../store/websocket/useChartStore';
import { useWebsocket } from '../useWebsocket';
import type { ChartData } from '../../types/websocket';

export const useChart = (categoryId: number) => {
  const { isConnected, stompClientRef } = useWebsocket();
  const { chartData, setChartData } = useChartStore();
  useEffect(() => {
    if (isConnected && stompClientRef.current && categoryId) {
      const subscription = stompClientRef.current.subscribe(`/topic/chart/${categoryId}`, (message) => {
        try {
          const data: ChartData = JSON.parse(message.body);
          setChartData([...(chartData || []), data]);
        } catch (error) {
          console.error('[useChart] 데이터 파싱 에러:', error);
        }
      });
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [isConnected, stompClientRef, categoryId, setChartData]);
};
