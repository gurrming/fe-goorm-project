import FlashConclusion from './FlashConclusion';
import { formatNumber } from '../../lib/price';
import { cn } from '../../lib/utils';
import useSelectedPriceStore from '../../store/useSelectedPriceStore';
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
  const { setSelectedPrice, setSelectedPriceAndQuantity } = useSelectedPriceStore();
  const openPrice = tradesData?.openPrice ?? 0; // 전일종가, 없으면 0

  const itemPrice = Number(item.orderPrice);
  const itemVolume = Number(item.totalRemainingCount);

  const handlePriceClick = () => {
    setSelectedPrice(itemPrice);
  };

  const handleQuantityClick = () => {
    setSelectedPriceAndQuantity(itemPrice, itemVolume);
  };

  // 등락률 계산: (호가 - 전일종가) / 전일종가 * 100
  // openPrice가 0이거나 유효하지 않으면 등락률을 0으로 설정
  const changeRate = openPrice > 0 ? ((itemPrice - openPrice) / openPrice) * 100 : 0;

  const price = formatNumber(itemPrice);
  const priceColor = changeRate === 0 ? 'text-black' : changeRate > 0 ? 'text-red-500' : 'text-blue-500';
  const changePrefix = changeRate > 0 ? '+' : '';
  const changeText = changeRate === 0 ? '0.00%' : `${changePrefix}${changeRate.toFixed(2)}%`;

  // volumeRate를 퍼센트로 변환
  const volumeRate = maxVolume > 0 ? itemVolume / maxVolume : 0;
  const barWidth = volumeRate * 100;

  const isLastPriceRow = typeof lastPrice?.price === 'number' && itemPrice === lastPrice.price;

  const row = (
    <div
      className={cn(
        'group grid px-2 text-xs border-t  border-white transition-colors w-full items-center justify-center',
        isAsk
          ? 'grid-cols-[5fr_4fr_1fr] bg-[#fff2f2] hover:bg-[#ffd1d1] hover:border hover:border-[#ffbaba]'
          : 'grid-cols-[1fr_4fr_5fr] bg-[#ebf2ff] hover:bg-[#d3e3f6] hover:border hover:border-[#bdd2f9]',
        isLastPriceRow && 'border border-black',
      )}
    >
      {/* 좌측 영역 */}
      <div className="flex flex-col items-center justify-center cursor-pointer" onClick={handlePriceClick}>
        {isAsk && (
          <>
            {isLastPriceRow ? (
              <FlashConclusion value={lastPrice?.price} className="rounded-[2px]">
                <div className={`${priceColor}`}>
                  <span className="font-semibold">{price}</span>
                  <span className={cn('text-[10px] ml-3', priceColor)}>{changeText}</span>
                </div>
              </FlashConclusion>
            ) : (
              <div className={`${priceColor}`}>
                <span className="font-semibold">{price}</span>
                <span className={cn('text-[10px] ml-3', priceColor)}>{changeText}</span>
              </div>
            )}
          </>
        )}
      </div>

      <div
        className="relative flex items-center justify-center min-h-6 text-[11px] cursor-pointer w-full h-full border-white border-x py-4"
        onClick={handleQuantityClick}
      >
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
        <span className="relative z-5">{formatNumber(itemVolume)}</span>
      </div>

      {/* Right 영역 */}
      <div className="flex flex-col items-center justify-center pl-3 cursor-pointer" onClick={handlePriceClick}>
        {!isAsk && (
          <>
            {isLastPriceRow ? (
              <FlashConclusion value={lastPrice?.price} className="rounded-[2px]">
                <div className={cn(priceColor)}>
                  <span className="font-semibold">{price}</span>
                  <span className={cn('text-[10px] ml-3', priceColor)}>{changeText}</span>
                </div>
              </FlashConclusion>
            ) : (
              <div className={cn(priceColor)}>
                <span className="font-semibold">{price}</span>
                <span className={cn('text-[10px] ml-3', priceColor)}>{changeText}</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );

  return row;
}
