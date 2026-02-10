import { useEffect } from 'react';
import { useAssetStore } from '../../store/websocket/useAssetStore';
import { useWebsocket } from '../useWebsocket';
import type { TMyPortfolio } from '../../types/asset';

export const useSummary = (memberId: number) => {
  const { isConnected, stompClientRef } = useWebsocket();
  const { setSummary, setWsAssetList } = useAssetStore();

  useEffect(() => {
    if (isConnected && stompClientRef.current && memberId) {
      const subscription = stompClientRef.current.subscribe(`/topic/invest/${memberId}`, (message) => {
        try {
          const data: TMyPortfolio = JSON.parse(message.body);
          const wsAssetList = data.assetList.map((item) => ({
            categoryId: item.categoryId,
            evaluationAmount: item.evaluationAmount,
            evaluationProfit: item.evaluationProfit,
          }));
          setWsAssetList(wsAssetList);
          setSummary(data);
        } catch (error) {
          console.error('[useSummary] 데이터 파싱 에러:', error);
        }
      });
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [isConnected, memberId, setSummary, setWsAssetList, stompClientRef]);
};
