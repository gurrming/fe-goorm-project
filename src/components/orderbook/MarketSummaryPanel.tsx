import { mockCurrentTradeData } from './mockData';
import { formatNumber } from '../../lib/price';

export default function MarketSummaryPanel() {
  const { previousClose, todayHigh, todayLow, volume, tradeAmount, symbol } = mockCurrentTradeData;

  // 변동률 계산
  const highChangeRate = ((todayHigh - previousClose) / previousClose) * 100;
  const lowChangeRate = ((todayLow - previousClose) / previousClose) * 100;

  // 변동률 포맷팅
  const formatChangeRate = (rate: number): string => {
    const sign = rate >= 0 ? '+' : '';
    return `${sign}${rate.toFixed(2)}%`;
  };

  return (
    <div className="bg-gray-50 p-2 flex flex-col justify-end h-full">
      <div className="mt-auto space-y-3">
        {/* 전일종가 */}
        <div className="flex justify-between items-center">
          <div className="text-[10px] text-primary-300">전일종가</div>
          <div className="flex flex-col items-end">
            <div className="text-[10px] text-primary-100">{formatNumber(previousClose)}</div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-[10px] text-primary-300">거래량</div>
          <div className="flex flex-col items-end">
            <div className="text-[10px] text-primary-100">{formatNumber(volume)}</div>
            <div className="text-[10px] text-primary-500">{symbol}</div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-[10px] text-primary-300">거래대금</div>
          <div className="flex flex-col items-end">
            <div className="text-[10px] text-primary-100">{formatNumber(tradeAmount)}</div>
            <div className="text-[10px] text-primary-500">(최근24시간)</div>
          </div>
        </div>

        {/* 당일고가 */}
        <div className="flex justify-between items-center border-t border-gray-300 pt-3">
          <div className="text-[10px] text-primary-300">당일고가</div>
          <div className="flex flex-col items-end">
            <div className="text-[10px] text-red-500">{formatNumber(todayHigh)}</div>
            <div className="text-[10px] text-red-500">{formatChangeRate(highChangeRate)}</div>
          </div>
        </div>

        {/* 당일저가 */}
        <div className="flex justify-between items-center">
          <div className="text-[10px] text-primary-300">당일저가</div>
          <div className="flex flex-col items-end">
            <div className="text-[10px] text-blue-500">{formatNumber(todayLow)}</div>
            <div className="text-[10px] text-blue-500">{formatChangeRate(lowChangeRate)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
