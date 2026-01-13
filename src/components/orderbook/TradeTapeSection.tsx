import { useGetCategoryInfo } from '../../api/useGetCategoryInfo';
import { formatNumber } from '../../lib/price';
import useCategoryIdStore from '../../store/useCategoryId';
import { useTradesStore } from '../../store/websocket/useTradesStore';

export default function TradeTapeSection() {
  const { tradesList, tradesData } = useTradesStore();
  const categoryId = useCategoryIdStore((state) => state.categoryId);
  const { data: categoryInfo } = useGetCategoryInfo(categoryId);

  // 체결강도 포맷팅
  const formatTradeStrength = (value: number): string => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${Number(value).toFixed(2)}%`;
  };

  // 최신 체결강도 (가장 최근 체결의 intensity 사용)
  const currentIntensity = tradesData?.intensity ?? 0;

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
      <div className="space-y-1 max-h-96 overflow-y-auto">
        {tradesList.length === 0 ? (
          <div className="text-center text-gray-400 text-[10px] py-4">체결 내역이 없습니다</div>
        ) : (
          tradesList.map((item) => (
            <div key={item.time} className="grid grid-cols-2 gap-2 text-[10px] py-1">
              <div className="text-gray-900 text-right">
                {formatNumber(item.price ?? categoryInfo?.tradePrice ?? 0)}
              </div>
              <div className={`text-right ${item.buyTaker ? 'text-blue-500' : 'text-red-500'}`}>
                {formatNumber(item.count ?? categoryInfo?.accVolume ?? 0)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
