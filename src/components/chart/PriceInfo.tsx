import React from 'react';
import { formatNumber } from '../../lib/price';
import { useTickerStore } from '../../store/websocket/useTickerStore';
import Text from '../common/Text';

type PriceInfoProps = {
  categoryId: number;
  quote?: string;
  symbol?: string;
};

const PriceInfo = ({ categoryId, quote = 'KRW', symbol }: PriceInfoProps) => {
  const ticker = useTickerStore((item) => item.tickerByCategoryId[categoryId]);

  return (
    <div className="flex items-center my-2">
      <div className="flex flex-col px-4 w-1/2">
        <p className={`text-[20px] font-bold ${(ticker?.changeRate ?? 0) < 0 ? 'text-[#0062DF]' : 'text-[#DD3C44]'}`}>
          {formatNumber(ticker?.price ?? 0)} <span className="text-sm">{quote}</span>
        </p>
        <div className="flex items-center gap-3">
          <p className={`text-sm ${(ticker?.changeRate ?? 0) < 0 ? 'text-[#0062DF]' : 'text-[#DD3C44]'}`}>
            {Math.ceil((ticker?.changeRate ?? 0) * 100) / 100}%
          </p>
          <p className={`text-sm ${(ticker?.changeRate ?? 0) < 0 ? 'text-[#0062DF]' : 'text-[#DD3C44]'}`}>
            {formatNumber(ticker?.changeAmount ?? 0)}
          </p>
        </div>
      </div>
      <div className="flex justify-end gap-2 px-4 py-2 w-1/2">
        <div className="flex flex-col gap-2 w-full">
          <Text size="xs" text="고가" price={formatNumber(ticker?.high ?? 0)} priceColor="red" />
          <div className="h-[0.5px] bg-gray-200 w-full" />
          <Text size="xs" text="저가" price={formatNumber(ticker?.low ?? 0)} priceColor="blue" />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Text size="xs" text="거래량" price={formatNumber(ticker?.volume ?? 0)} priceColor="black" type={symbol} />
          <div className="h-[0.5px] bg-gray-200 w-full" />
          <Text size="xs" text="거래대금" price={formatNumber(ticker?.amount ?? 0)} priceColor="black" type={quote} />
        </div>
      </div>
    </div>
  );
};

export default PriceInfo;
