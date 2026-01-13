import { useEffect } from 'react';
import { useGetChart } from '../../api/useGetChart';
import { useChartStore } from '../../store/websocket/useChartStore';
import { useWebsocket } from '../useWebsocket';
import type { ChartData, RawChartData } from '../../types/websocket';

export const useChart = (categoryId: number) => {
  const { isConnected, stompClientRef } = useWebsocket();
  const { addChartData, setChartData } = useChartStore();
  const { data: chartDataList, refetch } = useGetChart(categoryId, 0, 100);

  useEffect(() => {
    if (chartDataList) {
      // API에서 받은 데이터도 문자열로 올 수 있으므로 숫자로 변환 및 유효성 검사
      const normalizedData = chartDataList
        .map((item) => {
          const o = typeof item.o === 'number' ? item.o : parseFloat(String(item.o));
          const h = typeof item.h === 'number' ? item.h : parseFloat(String(item.h));
          const l = typeof item.l === 'number' ? item.l : parseFloat(String(item.l));
          const c = typeof item.c === 'number' ? item.c : parseFloat(String(item.c));
          const t = typeof item.t === 'number' ? item.t : parseInt(String(item.t), 10);

          // 유효하지 않은 데이터는 필터링
          if (
            !Number.isFinite(o) ||
            !Number.isFinite(h) ||
            !Number.isFinite(l) ||
            !Number.isFinite(c) ||
            !Number.isFinite(t)
          ) {
            return null;
          }

          return { t, o, h, l, c } as ChartData;
        })
        .filter((item): item is ChartData => item !== null);

      setChartData(normalizedData);
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
          // 백엔드에서 string으로 보낼 수 있으므로 number로 변환
          const rawData: RawChartData = JSON.parse(message.body);

          // 숫자 변환 및 유효성 검사
          const o = typeof rawData.o === 'number' ? rawData.o : parseFloat(String(rawData.o));
          const h = typeof rawData.h === 'number' ? rawData.h : parseFloat(String(rawData.h));
          const l = typeof rawData.l === 'number' ? rawData.l : parseFloat(String(rawData.l));
          const c = typeof rawData.c === 'number' ? rawData.c : parseFloat(String(rawData.c));
          const t = typeof rawData.t === 'number' ? rawData.t : parseInt(String(rawData.t), 10);

          // NaN이나 Infinity 체크
          if (
            !Number.isFinite(o) ||
            !Number.isFinite(h) ||
            !Number.isFinite(l) ||
            !Number.isFinite(c) ||
            !Number.isFinite(t)
          ) {
            console.warn('[useChart] 유효하지 않은 차트 데이터:', rawData);
            return;
          }

          const data: ChartData = {
            t,
            o,
            h,
            l,
            c,
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
