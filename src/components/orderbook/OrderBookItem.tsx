import { formatNumber } from '../../lib/price';
import { cn } from '../../lib/utils';
import { useTradesStore } from '../../store/websocket/useTradesStore';
import type { OrderbookItemData } from '../../types/websocket';

type OrderBookItemProps = {
  item: OrderbookItemData; // 호가창 아이템 데이터
  isAsk?: boolean; // 매도인지 매수인지 구분값, true면 매도를 위해 올린 값
  maxVolume: number; // 최대 거래량 (차트 바 너비 계산용)
};

export default function OrderBookItem({ item, isAsk = false, maxVolume }: OrderBookItemProps) {
  const { tradesData } = useTradesStore();
  const openPrice = tradesData?.openPrice ?? 0; // 전일종가, 없으면 0

  // 등락률 계산: (호가 - 전일종가) / 전일종가 * 100
  const providedChangeRate = item.changeRate;
  const changeRate = providedChangeRate ?? (openPrice > 0 ? ((item.price - openPrice) / openPrice) * 100 : 0);

  // 매수 창이어도 등락률이 양수면 빨강, 음수면 파랑으로 표시하는 게 맞음
  const priceColor = changeRate === 0 ? 'text-black' : changeRate > 0 ? 'text-red-500' : 'text-blue-500';
  const changePrefix = changeRate > 0 ? '+' : '';
  const changeText = changeRate === 0 ? '0.00%' : `${changePrefix}${changeRate.toFixed(2)}%`;

  // volumeRate를 퍼센트로 변환
  const volumeRate = maxVolume > 0 ? item.volume / maxVolume : 0;
  const barWidth = volumeRate * 100;

  return (
    <div
      className={cn(
        'group grid py-2 px-2 text-xs border-t border-b border-white transition-colors cursor-pointer w-full items-center justify-center',
        isAsk ? 'grid-cols-[5fr_4fr_1fr]' : 'grid-cols-[1fr_4fr_5fr]',
        isAsk ? 'bg-[#fff2f2]' : 'bg-[#ebf2ff]',
        isAsk
          ? 'hover:bg-[#ffd1d1] hover:border hover:border-[#ffbaba]'
          : 'hover:bg-[#d3e3f6] hover:border hover:border-[#bdd2f9]',
      )}
    >
      {/* 좌측 영역 */}
      <div className="flex flex-col items-center justify-center">
        {isAsk && (
          <>
            <div className={`${priceColor}`}>
              <span className="font-semibold">{formatNumber(item.price)}</span>
              <span className={cn('text-[10px] ml-3', priceColor)}>{changeText}</span>
            </div>
          </>
        )}
      </div>

      {/* 가운데 차트 영역 */}
      <div className="relative  flex items-center justify-center min-h-6 text-[10px]">
        {isAsk ? (
          <>
            <div
              className="absolute left-0 top-0 bottom-0 pointer-events-none bg-[#ffd4d5] group-hover:bg-[#ffb3b5] transition-colors"
              style={{ width: `${barWidth}%` }}
            />
          </>
        ) : (
          <>
            <div
              className="absolute right-0 top-0 bottom-0 pointer-events-none bg-[#cee4ff] group-hover:bg-[#a8d4ff] transition-colors"
              style={{ width: `${barWidth}%` }}
            />
          </>
        )}
        {/* 잔량 숫자 (중앙 정렬) */}
        <span className="relative z-5">{formatNumber(item.volume)}</span>
      </div>

      {/* Right 영역 */}
      <div className="flex flex-col items-center justify-center pl-3">
        {!isAsk && (
          <>
            <div className={cn(priceColor)}>
              <span className="font-semibold">{formatNumber(item.price)}</span>
              <span className={cn('text-[10px] ml-3', priceColor)}>{changeText}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
