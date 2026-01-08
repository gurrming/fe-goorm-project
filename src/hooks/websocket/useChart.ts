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
      const subscriptionPath = `/topic/charts/${categoryId}`;
      console.log(`[useChart] 구독 시작: ${subscriptionPath}`);

      const subscription = stompClientRef.current.subscribe(subscriptionPath, (message) => {
        try {
          console.log('[useChart] 메시지 수신 (raw):', message.body);
          // 백엔드에서 string으로 보내므로 number로 변환
          const rawData = JSON.parse(message.body);
          const data: ChartData = {
            t: typeof rawData.t === 'string' ? parseInt(rawData.t, 10) : rawData.t,
            o: typeof rawData.o === 'string' ? parseFloat(rawData.o) : rawData.o,
            h: typeof rawData.h === 'string' ? parseFloat(rawData.h) : rawData.h,
            l: typeof rawData.l === 'string' ? parseFloat(rawData.l) : rawData.l,
            c: typeof rawData.c === 'string' ? parseFloat(rawData.c) : rawData.c,
          };
          console.log('[useChart] 차트 데이터 수신 (parsed):', data);
          // 함수형 업데이트로 클로저 문제 해결
          setChartData((prev) => {
            const updated = [...(prev || []), data];
            console.log('[useChart] chartData 업데이트:', {
              이전_길이: prev?.length || 0,
              새로운_길이: updated.length,
              전체_데이터: updated,
            });
            return updated;
          });
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
  }, [isConnected, categoryId, setChartData, stompClientRef]);
};
