import { useEffect } from 'react';
import { useGetTrades } from '../../api/useGetTrades';
import { useTrades } from '../../hooks/websocket/useTrades';
import { formatNumber } from '../../lib/price';
import useCategoryIdStore from '../../store/useCategoryId';
import { useTradesStore } from '../../store/websocket/useTradesStore';
import { useGetVolumePower } from '@/api/useGetVolumePower';

export default function TradeTapeSection() {
  useTrades();
  const { tradesList, tradesData, restApiInitData } = useTradesStore();
  const categoryId = useCategoryIdStore((state) => state.categoryId);
  const { data: trades } = useGetTrades(categoryId);
  const { data: volumePower } = useGetVolumePower(categoryId);

  // categoryId 변경 시 저장소 초기화해서 뿌려주기
  useEffect(() => {
    if (trades) {
      restApiInitData(trades);
    }
  }, [trades, restApiInitData]);

  // 체결강도 포맷팅
  const formatTradeStrength = (value: number): string => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${Number(value).toFixed(2)}%`;
  };
  // 최신 체결강도 (가장 최근 체결의 intensity 사용)
  const currentIntensity =
    tradesData && 'intensity' in tradesData ? tradesData.intensity : (volumePower?.intensity ?? 0);
  // store에서 REST API와 WebSocket 데이터를 합쳐서 표시
  const tradeDisplayData = tradesList;

  return (
    <div className="bg-white p-4">
      {/* 체결강도 헤더 */}
      <div className="flex justify-between items-center pb-2 mb-2 border-b border-gray-300">
        <div className="text-[10px] text-primary-300">체결강도</div>
        <div className="text-[10px] text-primary-100 font-semibold">{formatTradeStrength(currentIntensity)}</div>
      </div>

      {/* 테이블 헤더 */}
      <div className="grid grid-cols-2 gap-2 pb-2 mb-2">
        <div className="text-[10px] text-primary-300 text-center">체결가</div>
        <div className="text-[10px] text-primary-300 text-center border-l border-gray-300">체결량</div>
      </div>

      {/* 체결 내역 리스트 */}
      <div className="space-y-1">
        {tradeDisplayData.length === 0 ? (
          <div className="text-center text-gray-400 text-[10px] py-4">체결 내역이 없습니다</div>
        ) : (
          tradeDisplayData.map((item, index) => {
            // REST API 또는 WebSocket 데이터 묶어서
            const price = 'price' in item ? item.price : item.tradePrice;
            const count = 'count' in item ? item.count : item.tradeCount;
            const type = 'type' in item ? item.type : item.takerType === 'BUY' ? 'BUY' : 'SELL';
            const time = 'time' in item ? item.time : new Date(item.tradeTime).getTime();

            return (
              <div key={`${time}-${index}`} className="grid grid-cols-2 gap-2 text-[10px] py-1">
                <div className="text-gray-900 text-right">{formatNumber(price ?? 0)}</div>
                <div className={`text-right ${type === 'BUY' ? 'text-red-500' : 'text-blue-500'}`}>
                  {formatNumber(count ?? 0)}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
