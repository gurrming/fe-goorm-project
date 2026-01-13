import FlashConclusion from './FlashConclusion';
import { formatNumber } from '../../lib/price';
import { cn } from '../../lib/utils';
import { useOrderbookStore } from '../../store/websocket/useOrderbookStore';
import { useTradesStore } from '../../store/websocket/useTradesStore';
import type { OrderbookItemData } from '../../types/websocket';

type OrderBookItemProps = {
  item: OrderbookItemData; // 호가창 아이템 데이터
  isAsk?: boolean; // 매도인지 매수인지 구분값, true면 매도를 위해 올린 값
  maxVolume: number; // 최대 거래량 (차트 바 너비 계산용)
};

export default function OrderBookItem({ item, isAsk = false, maxVolume }: OrderBookItemProps) {
  const { tradesData } = useTradesStore();
  const lastPrice = useOrderbookStore((state) => state.lastPrice);
  const openPrice = tradesData?.openPrice ?? 0;

  const price = item.price ?? 0;
  const volume = item.volume ?? 0;
  // 호가에 있는 등락률은 프론트에서 계산한다.
  const changeRate = openPrice !== 0 ? ((price - openPrice) / openPrice) * 100 : 0;

  const priceColor = changeRate === 0 ? 'text-black' : changeRate > 0 ? 'text-red-500' : 'text-blue-500';
  const changePrefix = changeRate > 0 ? '+' : '';
  const changeText = changeRate === 0 ? '0.00%' : `${changePrefix}${Number(changeRate.toFixed(2))}%`;

  const barWidth = maxVolume > 0 ? (item.volume / maxVolume) * 100 : 0;
  const isLastPriceRow = typeof lastPrice?.price === 'number' && item.price === lastPrice.price;

  // 가격 표시 컴포넌트
  const PriceDisplay = () => {
    const content = (
      <div className={priceColor}>
        <span className="font-semibold">{Number(formatNumber(price))}</span>
        <span className={cn('text-[10px] ml-3', priceColor)}>{changeText}</span>
      </div>
    );

    return isLastPriceRow ? (
      <FlashConclusion value={lastPrice?.price} className="rounded-[2px]">
        {content}
      </FlashConclusion>
    ) : (
      content
    );
  };

  return (
    <div
      className={cn(
        'group grid py-2 px-2 text-xs border-t border-b border-white transition-colors cursor-pointer w-full items-center justify-center',
        isAsk ? 'grid-cols-[5fr_4fr_1fr]' : 'grid-cols-[1fr_4fr_5fr]',
        isAsk ? 'bg-[#fff2f2]' : 'bg-[#ebf2ff]',
        isAsk
          ? 'hover:bg-[#ffd1d1] hover:border hover:border-[#ffbaba]'
          : 'hover:bg-[#d3e3f6] hover:border hover:border-[#bdd2f9]',
        isLastPriceRow && 'border border-black',
      )}
    >
      {/* 좌측 영역 (매도) */}
      {isAsk && (
        <div className="flex flex-col items-center justify-center">
          <PriceDisplay />
        </div>
      )}

      {/* 가운데 차트 영역 */}
      <div className="relative flex items-center justify-center min-h-6 text-[10px]">
        <div
          className={cn(
            'absolute top-0 bottom-0 pointer-events-none transition-colors',
            isAsk ? 'left-0 bg-[#ffd4d5] group-hover:bg-[#ffb3b5]' : 'right-0 bg-[#cee4ff] group-hover:bg-[#a8d4ff]',
          )}
          style={{ width: `${barWidth}%` }}
        />
        <span className="relative z-5">{formatNumber(volume)}</span>
      </div>

      {/* 우측 영역 (매수) */}
      {!isAsk && (
        <div className="flex flex-col items-center justify-center pl-3">
          <PriceDisplay />
        </div>
      )}
    </div>
  );
}
