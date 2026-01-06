import { formatNumber } from '../../lib/price';
import { cn } from '../../lib/utils';
import { useTradesStore } from '../../store/websocket/useTradesStore';

// 호가창 아이템 데이터 타입

export type OrderBookItemData = {
  price: number; // 가격
  volume: number; // 거래량/잔량
  changeRate: number; // 변동률 (퍼센트)
};

type OrderBookItemProps = {
  item: OrderBookItemData; // 호가창 아이템 데이터
  isAsk?: boolean; // 매도인지 매수인지 구분값, true면 매도를 위해 올린 값
  maxVolume: number; // 최대 거래량 (차트 바 너비 계산용)
};

export default function OrderBookItem({ item, isAsk = false, maxVolume }: OrderBookItemProps) {
  const { tradesData } = useTradesStore();
  const currentPrice = tradesData?.price ?? 0; // 체결가, 없으면 0.00
  const openPrice = tradesData?.openPrice ?? 0; // 전일종가, 없으면 0

  // 등락률 계산: (체결가 - 전일종가) / 전일종가 * 100
  const changeRate = openPrice > 0 ? ((currentPrice - openPrice) / openPrice) * 100 : 0;

  const priceColor = changeRate === 0 ? 'text-black' : isAsk ? 'text-blue-500' : 'text-red-500';
  const changePrefix = changeRate > 0 ? '+' : '';
  const changeText = changeRate === 0 ? '0.00%' : `${changePrefix}${changeRate.toFixed(2)}%`;

  // volumeRate를 퍼센트로 변환
  const volumeRate = maxVolume > 0 ? item.volume / maxVolume : 0;
  const barWidth = volumeRate * 100;

  // 어제 값은 검은색 표시 0.00% 검은색으로 표시
  // AskBook.tsx에서는 어제 값 기준으로 현재가가 낮으면 - 붙여주면서 %표시
  // BidBook.tsx에서는 어제 값 기준으로 현재가가 높으면 + 붙여주면서 %표시
  // 서버에서 아마 어제 값을 주고

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
              <span className="font-semibold">{formatNumber(currentPrice)}</span>
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
              <span className="font-semibold">{formatNumber(currentPrice)}</span>
              <span className={cn('text-[10px] ml-3', priceColor)}>{changeText}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
