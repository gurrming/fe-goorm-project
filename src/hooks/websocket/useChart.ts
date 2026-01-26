import { useEffect } from 'react';
import { useChartStore } from '../../store/websocket/useChartStore';
import { useWebsocket } from '../useWebsocket';
import type { ChartData, RawChartData } from '../../types/websocket';

export const useChart = (categoryId: number) => {
  const { isConnected, stompClientRef } = useWebsocket();
  const { addChartData, clearChartDataList } = useChartStore();

  useEffect(() => {
    clearChartDataList();
  }, [categoryId, clearChartDataList]);

  useEffect(() => {
    if (!isConnected || !stompClientRef.current || !categoryId) {
      return;
    }

    const subscriptionPath = `/topic/charts/${categoryId}`;
    const subscription = stompClientRef.current.subscribe(subscriptionPath, (message) => {
      try {
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
          return;
        }
        if (isNaN(t) || isNaN(c)) return;

        const data: ChartData = {
          t,
          o,
          h,
          l,
          c,
        };
        // 함수형 업데이트로 클로저 문제 해결
        addChartData(data);
      } catch (error) {
        console.error('[useChart] 데이터 파싱 에러:', error, message.body);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [isConnected, categoryId, addChartData, stompClientRef]);
};
