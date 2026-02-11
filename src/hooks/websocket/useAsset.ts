import { useEffect } from 'react';
import { useAssetStore } from '../../store/websocket/useAssetStore';
import { useWebsocket } from '../useWebsocket';
import type { TMyPortfolio } from '../../types/asset';

// export const useAsset = (memberId: number) => {
//   const { isConnected, stompClientRef } = useWebsocket();
//   const { updateTotalAsset } = useAssetStore();

//   useEffect(() => {
//     if (isConnected && stompClientRef.current && memberId) {
//       const subscription = stompClientRef.current.subscribe(`/topic/asset/${memberId}`, (message) => {
//         try {
//           const data: TWSAssets = JSON.parse(message.body);
//           console.log('웹소켓 asset data', data);
//           updateTotalAsset(data.totalAsset);
//         } catch (error) {
//           console.error('[useAsset] 데이터 파싱 에러:', error);
//         }
//       });
//       return () => {
//         subscription.unsubscribe();
//       };
//     }
//   }, [isConnected, memberId, updateTotalAsset, stompClientRef]);
// };

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
          setSummary({
            totalAsset: data.totalAsset,
            totalBuyAmount: data.totalBuyAmount,
            totalEvaluation: data.totalEvaluation,
            totalProfit: data.totalProfit,
            totalProfitRate: data.totalProfitRate,
          });
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
