import { useGetCategoryInfo } from '../../api/useGetCategoryInfo';
import { useTicker } from '../../hooks/websocket/useTicker';
import { formatNumber } from '../../lib/price';
import useCategoryIdStore from '../../store/useCategoryId';
import { useTickerStore } from '../../store/websocket/useTickerStore';
import { useTradesStore } from '../../store/websocket/useTradesStore';

export default function MarketSummaryPanel() {
  const categoryId = useCategoryIdStore((state) => state.categoryId);
  const { data: categoryInfo } = useGetCategoryInfo(categoryId);
  const symbol = categoryInfo?.symbol;

  useTicker([categoryId]);

  const ticker = useTickerStore((state) => state.tickerByCategoryId[categoryId]);
  const { tradesData } = useTradesStore();

  // ticker 데이터가 없을 때는 0으로 표기
  const high = ticker?.high ?? categoryInfo?.dailyHigh ?? 0;
  const low = ticker?.low ?? categoryInfo?.dailyLow ?? 0;
  const volume = ticker?.volume ?? categoryInfo?.accVolume ?? 0;
  const amount = ticker?.amount ?? categoryInfo?.accAmount ?? 0;

  // 전일종가는 /topic/trades에서 받아옴
  const previousClose = tradesData?.openPrice ?? 0;

  // 변동률 포맷팅

  // 고가/저가 변동률 계산
  const highChangeRate =
    previousClose !== 0 ? ((high - previousClose) / previousClose) * 100 : (categoryInfo?.changeRate ?? 0);
  const lowChangeRate =
    previousClose !== 0 ? ((low - previousClose) / previousClose) * 100 : (categoryInfo?.changeRate ?? 0);

  return (
    <div className="bg-gray-50 p-2 flex flex-col justify-end h-full">
      <div className="mt-auto space-y-3">
        <div className="flex justify-between items-center">
          {/* 일단 전일 종가 REST API 값 없음 */}
          <div className="text-[10px] text-primary-300">전일종가</div>
          <div className="flex flex-col items-end">
            <div className="text-[10px] text-primary-100">{formatNumber(previousClose)}</div>
          </div>
        </div>

        {/* 거래량 */}
        <div className="flex justify-between items-center">
          <div className="text-[10px] text-primary-300">거래량</div>
          <div className="flex flex-col items-end">
            <div className="text-[10px] text-primary-100">{formatNumber(volume)}</div>
            <div className="text-[10px] text-primary-500">{symbol}</div>
          </div>
        </div>

        {/* 거래대금 */}
        <div className="flex justify-between items-center">
          <div className="text-[10px] text-primary-300">거래대금</div>
          <div className="flex flex-col items-end">
            <div className="text-[10px] text-primary-100">{formatNumber(amount)}</div>
            <div className="text-[10px] text-primary-500">(최근24시간)</div>
          </div>
        </div>

        {/* 당일고가 */}
        <div className="flex justify-between items-center border-t border-gray-300 pt-3">
          <div className="text-[10px] text-primary-300">당일고가</div>
          <div className="flex flex-col items-end">
            <div className="text-[10px] text-red-500">{formatNumber(high ?? categoryInfo)}</div>
            <div className="text-[10px] text-red-500">{`+ ${highChangeRate.toFixed(2)}`}%</div>
          </div>
        </div>

        {/* 당일저가 */}
        <div className="flex justify-between items-center">
          <div className="text-[10px] text-primary-300">당일저가</div>
          <div className="flex flex-col items-end">
            <div className="text-[10px] text-blue-500">{formatNumber(low)}</div>
            <div className="text-[10px] text-blue-500">{`- ${lowChangeRate.toFixed(2)}`}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
