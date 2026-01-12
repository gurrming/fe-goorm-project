import { useEffect } from 'react';
import { useAssetStore } from '../../store/websocket/useAssetStore';
import { useWebsocket } from '../useWebsocket';
import type { TWSAssets, TMyPortfolio } from '../../types/asset';

export const useAsset = (memberId: number) => {
  const { isConnected, stompClientRef } = useWebsocket();
  const { setWsTotalAsset } = useAssetStore();

  useEffect(() => {
    if (isConnected && stompClientRef.current && memberId) {
      console.log(`[useAsset] /topic/assets/${memberId} 구독 시작`);
      const subscription = stompClientRef.current.subscribe(`/topic/assets/${memberId}`, (message) => {
        try {
          const data: TWSAssets = JSON.parse(message.body);
          console.log('[useAsset] 자산 데이터 수신:', data);
          setWsTotalAsset(data.totalAsset);
        } catch (error) {
          console.error('[useAsset] 데이터 파싱 에러:', error);
        }
      });
      return () => {
        console.log(`[useAsset] /topic/assets/${memberId} 구독 해제`);
        subscription.unsubscribe();
      };
    }
  }, [isConnected, memberId, setWsTotalAsset, stompClientRef]);
};

export const useSummary = (memberId: number) => {
  const { isConnected, stompClientRef } = useWebsocket();
  const { setSummary } = useAssetStore();

  useEffect(() => {
    if (isConnected && stompClientRef.current && memberId) {
      console.log(`[useAsset] /topic/invest/${memberId} 구독 시작`);
      const subscription = stompClientRef.current.subscribe(`/topic/invest/${memberId}`, (message) => {
        try {
          const data: TMyPortfolio = JSON.parse(message.body);
          console.log('[useSummary] 요약 데이터 수신:', data);
          setSummary(data);
        } catch (error) {
          console.error('[useSummary] 데이터 파싱 에러:', error);
        }
      });
      return () => {
        console.log(`[useAsset] /topic/summary/${memberId} 구독 해제`);
        subscription.unsubscribe();
      };
    }
  }, [isConnected, memberId, setSummary, stompClientRef]);
};
