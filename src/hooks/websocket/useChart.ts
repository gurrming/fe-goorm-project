import { useEffect } from 'react';
import { useGetChart } from '../../api/useGetChart';
import { useChartStore } from '../../store/websocket/useChartStore';
import { useWebsocket } from '../useWebsocket';
import type { ChartData, RawChartData } from '../../types/websocket';

export const useChart = (categoryId: number) => {
  const { isConnected, stompClientRef } = useWebsocket();
  const { addChartData, setChartData } = useChartStore();
  const { data: chartDataList, refetch } = useGetChart(categoryId, 1, 100);

  useEffect(() => {
    if (chartDataList) {
      setChartData(chartDataList);
    }
    refetch();
  }, [categoryId, refetch, chartDataList, setChartData]);

  useEffect(() => {
    if (isConnected && stompClientRef.current && categoryId) {
      const subscriptionPath = `/topic/charts/${categoryId}`;
      console.log(`[useChart] 구독 시작: ${subscriptionPath}`);

      const subscription = stompClientRef.current.subscribe(subscriptionPath, (message) => {
        try {
          console.log('[useChart] 메시지 수신 (raw):', message.body);
          // 백엔드에서 string으로 보내므로 number로 변환
          const rawData: RawChartData = JSON.parse(message.body);
          const data: ChartData = {
            t: rawData.t,
            o: parseFloat(rawData.o),
            h: parseFloat(rawData.h),
            l: parseFloat(rawData.l),
            c: parseFloat(rawData.c),
          };
          console.log('[useChart] 차트 데이터 수신 (parsed):', data);
          // 함수형 업데이트로 클로저 문제 해결
          addChartData(data);
        } catch (error) {
          console.error('[useChart] 데이터 파싱 에러:', error, message.body);
        }
      });

      console.log('[useChart] 구독 객체 생성됨:', subscription.id);

      return () => {
        console.log(`[useChart] 구독 해제: ${subscriptionPath}`);
        subscription.unsubscribe();
      };
    } else {
      console.warn('[useChart] 구독 조건 불만족:', {
        isConnected,
        hasStompClient: !!stompClientRef.current,
        categoryId,
      });
    }
  }, [isConnected, categoryId, addChartData, stompClientRef]);
};
