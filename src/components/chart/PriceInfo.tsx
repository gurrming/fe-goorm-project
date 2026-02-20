import React from 'react';
import { Info_Skeleton } from './loading/Info_Skeleton';
import { useGetCategoryInfo } from '../../api/useGetCategoryInfo';
import { formatInteger, formatNumber } from '../../lib/price';
import { useTickerStore } from '../../store/websocket/useTickerStore';
import Text from '../common/Text';

type PriceInfoProps = {
  categoryId: number;
  quote?: string;
  symbol?: string;
};

const PriceInfo = ({ categoryId, quote = 'KRW', symbol }: PriceInfoProps) => {
  const ticker = useTickerStore((item) => item.tickerByCategoryId[categoryId]);
  const { data: categoryInfo, isPending } = useGetCategoryInfo(categoryId);

  const price = ticker?.price ?? categoryInfo?.tradePrice ?? 0;
  const changeAmount = ticker?.changeAmount ?? categoryInfo?.changeAmount ?? 0;
  const rawChangeRate = ticker?.changeRate ?? categoryInfo?.changeRate ?? 0;
  const high = ticker?.high ?? categoryInfo?.dailyHigh ?? 0;
  const low = ticker?.low ?? categoryInfo?.dailyLow ?? 0;
  const volume = ticker?.volume ?? categoryInfo?.accVolume ?? 0;
  const amount = ticker?.amount ?? categoryInfo?.accAmount ?? 0;

  if (isPending) return <Info_Skeleton />;

  return (
    <div className="flex items-center my-2">
      <div className="flex flex-col px-4 w-1/2">
        <p className={`text-[20px] font-bold ${rawChangeRate < 0 ? 'text-[#0062DF]' : 'text-[#DD3C44]'}`}>
          {formatNumber(price)} <span className="text-sm">{quote}</span>
        </p>
        <div className="flex items-center gap-3">
          <p className={`text-sm ${rawChangeRate < 0 ? 'text-[#0062DF]' : 'text-[#DD3C44]'}`}>
            {Math.ceil(rawChangeRate * 100) / 100}%
          </p>
          <p className={`text-sm ${rawChangeRate < 0 ? 'text-[#0062DF]' : 'text-[#DD3C44]'}`}>
            {formatNumber(changeAmount)}
          </p>
        </div>
      </div>
      <div className="flex justify-end gap-2 px-4 py-2 w-1/2">
        <div className="flex flex-col gap-2 w-full">
          <Text size="xs" text="고가" price={formatNumber(high)} priceColor="red" />
          <div className="h-[0.5px] bg-gray-200 w-full" />
          <Text size="xs" text="저가" price={formatNumber(low)} priceColor="blue" />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Text size="xs" text="거래량" price={formatNumber(volume)} priceColor="black" type={symbol} />
          <div className="h-[0.5px] bg-gray-200 w-full" />
          <Text size="xs" text="거래대금" price={formatInteger(amount)} priceColor="black" type={quote} />
        </div>
      </div>
    </div>
  );
};

export default PriceInfo;
