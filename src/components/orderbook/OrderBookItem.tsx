import { memo, useEffect, useState } from 'react';
import FlashConclusion from './FlashConclusion';
import { formatNumber } from '../../lib/price';
import { cn } from '../../lib/utils';
import useSelectedPriceStore from '../../store/useSelectedPriceStore';
import { useOrderbookStore } from '../../store/websocket/useOrderbookStore';
import type { OrderbookItemData } from '../../types/websocket';
import { useGetCategoryInfo } from '@/api/useGetCategoryInfo';
import useCategoryIdStore from '@/store/useCategoryId';

/** 호가 가격 + 등락률을 체결 플래시(FlashConclusion)로 감싸 표시 */
const OrderBookPriceWithFlash = memo(function OrderBookPriceWithFlash({
  isFlashing,
  price,
  percentageNumber,
  priceColor,
  className,
}: {
  isFlashing: boolean;
  price: string;
  percentageNumber: string;
  priceColor: string;
  className?: string;
}) {
  return (
    <FlashConclusion isFlashing={isFlashing} className={className}>
      <div className={priceColor}>
        <span className="font-semibold">{price}</span>
        <span className={cn('text-[10px] ml-3', priceColor)}>{percentageNumber}</span>
      </div>
    </FlashConclusion>
  );
});

type OrderBookItemProps = {
  item: OrderbookItemData; // 호가창 아이템 데이터
  isSell?: boolean; // 매도인지 매수인지 구분값, true면 매도를 위해 올린 값
  maxVolume: number; // 최대 거래량 (차트 바 너비 계산용)
};

export default function OrderBookItem({ item, isSell = true, maxVolume }: OrderBookItemProps) {
  const categoryId = useCategoryIdStore((state) => state.categoryId);
  const lastPrice = useOrderbookStore((state) => state.lastPrice);
  const [isFlashing, setIsFlashing] = useState(false);
  const { setSelectedPrice, setSelectedPriceAndQuantity } = useSelectedPriceStore();
  const { data: categoryInfo } = useGetCategoryInfo(categoryId);
  const openPrice = categoryInfo?.openPrice ?? 0;
  const nowPrice = categoryInfo?.tradePrice;

  const itemPrice = item.orderPrice;
  const itemVolume = item.totalRemainingCount;

  const lastPriceNumber = lastPrice?.price;

  // 웹소켓 먼저, 이후에 REST 현재가
  const flashPrice = lastPriceNumber ?? nowPrice;
  const isLastPriceRow = flashPrice != null && itemPrice === flashPrice;

  useEffect(() => {
    if (flashPrice == null) return;
    if (itemPrice !== flashPrice) return;
    setIsFlashing(true);
  }, [flashPrice, itemPrice]);

  const handlePriceClick = () => {
    setSelectedPrice(itemPrice);
  };

  const handleQuantityClick = () => {
    setSelectedPriceAndQuantity(itemPrice, itemVolume);
  };

  // 등락률 계산: (호가 - 전일종가) / 전일종가 * 100
  // openPrice가 0이거나 유효하지 않으면 등락률을 0으로 설정
  const changeRate = openPrice > 0 ? ((itemPrice - openPrice) / openPrice) * 100 : 0;

  const price = itemPrice.toLocaleString('ko-KR');
  const priceColor = changeRate === 0 ? 'text-black' : changeRate > 0 ? 'text-red-600' : 'text-blue-600';
  const changePrefix = changeRate > 0 ? '+' : '';
  const percentageNumber = changeRate === 0 ? '0.00%' : `${changePrefix}${changeRate.toFixed(2)}%`;

  // volumeRate를 퍼센트로 변환
  const volumeRate = maxVolume > 0 ? itemVolume / maxVolume : 0;
  const barWidth = volumeRate * 100;

  const row = (
    <div
      className={cn(
        'group grid px-2 text-xs border-t border-white transition-colors w-full items-center justify-center',
        isSell
          ? 'grid-cols-[1fr_4fr_5fr] bg-[#ebf2ff] hover:bg-[#d3e3f6] hover:border hover:border-[#bdd2f9]'
          : 'grid-cols-[5fr_4fr_1fr] bg-[#fff2f2] hover:bg-[#ffd1d1] hover:border hover:border-[#ffbaba]',
        isLastPriceRow && 'border-2 border-black',
      )}
    >
      {/* 좌측 영역 */}
      <div className="flex flex-col items-center justify-center cursor-pointer" onClick={handlePriceClick}>
        {!isSell && (
          <OrderBookPriceWithFlash
            isFlashing={isFlashing}
            price={price}
            percentageNumber={percentageNumber}
            priceColor={priceColor}
          />
        )}
      </div>

      {/* Bar Chart */}
      <div
        className="relative flex items-center justify-center min-h-6 text-[11px] cursor-pointer w-full h-full border-white border-x py-4"
        onClick={handleQuantityClick}
      >
        {isSell ? (
          <>
            <div
              className="absolute right-0 top-0 bottom-0 pointer-events-none bg-[#cee4ff] group-hover:bg-[#a8d4ff] transition-colors"
              style={{ width: `${barWidth}%` }}
            />
          </>
        ) : (
          <>
            <div
              className="absolute left-0 top-0 bottom-0 pointer-events-none bg-[#ffd4d5] group-hover:bg-[#ffb3b5] transition-colors"
              style={{ width: `${barWidth}%` }}
            />
          </>
        )}
        {/* 잔량 숫자 (중앙 정렬) */}
        <span className="relative z-5">{formatNumber(itemVolume)}</span>
      </div>

      {/* Right 영역 */}
      <div className="flex flex-col items-center justify-center pl-3 cursor-pointer" onClick={handlePriceClick}>
        {isSell && (
          <OrderBookPriceWithFlash
            isFlashing={isFlashing}
            price={price}
            percentageNumber={percentageNumber}
            priceColor={priceColor}
            className="rounded-[2px]"
          />
        )}
      </div>
    </div>
  );

  return row;
}
