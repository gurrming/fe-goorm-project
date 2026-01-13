import { useEffect, useMemo, useRef } from 'react';
import { useTickerStore } from '../../store/websocket/useTickerStore';
import { useWebsocket } from '../useWebsocket';
import type { TickerData } from '../../types/websocket';

type SubscriptionLike = {
  unsubscribe: () => void;
};

/**
 * 여러 종목의 /topic/ticker/{categoryId} 를 일괄 구독하는 훅
 * - Market 테이블처럼 동시에 여러 행에 티커가 필요한 곳에서 사용합니다.
 */
export const useTicker = (categoryIds: number[]) => {
  const { isConnected, stompClientRef } = useWebsocket();
  const { setTickerData, clearTickerData } = useTickerStore();
  const subsRef = useRef<Record<number, SubscriptionLike>>({});

  const stableKey = useMemo(() => {
    const uniq = Array.from(new Set(categoryIds.filter(Boolean)));
    uniq.sort((a, b) => a - b);
    return uniq.join(',');
  }, [categoryIds]);

  const stableIds = useMemo(() => {
    if (!stableKey) return [];
    return stableKey
      .split(',')
      .filter(Boolean)
      .map((v) => Number(v));
  }, [stableKey]);

  useEffect(() => {
    if (!isConnected || !stompClientRef.current) {
      return;
    }

    const client = stompClientRef.current;
    const nextSet = new Set(stableIds);

    // 신규 구독
    for (const categoryId of nextSet) {
      if (subsRef.current[categoryId]) continue;

      const topic = `/topic/ticker/${categoryId}`;
      subsRef.current[categoryId] = client.subscribe(topic, (message) => {
        try {
          const rawData = JSON.parse(message.body);
          // 백엔드에서 문자열로 보낼 수 있으므로 number로 변환
          const data: TickerData = {
            price: typeof rawData.price === 'number' ? rawData.price : parseFloat(rawData.price) || 0,
            changeRate: typeof rawData.changeRate === 'number' ? rawData.changeRate : parseFloat(rawData.changeRate) || 0,
            changeAmount: typeof rawData.changeAmount === 'number' ? rawData.changeAmount : parseFloat(rawData.changeAmount) || 0,
            high: typeof rawData.high === 'number' ? rawData.high : parseFloat(rawData.high) || 0,
            low: typeof rawData.low === 'number' ? rawData.low : parseFloat(rawData.low) || 0,
            volume: typeof rawData.volume === 'number' ? rawData.volume : parseFloat(rawData.volume) || 0,
            amount: typeof rawData.amount === 'number' ? rawData.amount : parseFloat(rawData.amount) || 0,
          };
          setTickerData(categoryId, data);
        } catch (error) {
          console.error('[useTicker] 데이터 파싱 에러:', error, message.body);
        }
      });
    }

    // 제거된 구독 정리
    for (const key of Object.keys(subsRef.current)) {
      const categoryId = Number(key);
      if (nextSet.has(categoryId)) continue;
      subsRef.current[categoryId].unsubscribe();
      delete subsRef.current[categoryId];
      clearTickerData(categoryId);
    }

    return () => {
      // 컴포넌트 언마운트 시 전체 해제
      for (const sub of Object.values(subsRef.current)) {
        sub.unsubscribe();
      }
      subsRef.current = {};
    };
  }, [isConnected, stompClientRef, setTickerData, clearTickerData, stableIds]);
};
