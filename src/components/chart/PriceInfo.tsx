import React from 'react';
import Text from '../Text';
import type { TDayData } from '../../types/upBit';

const PriceInfo = ({ data }: { data: TDayData[] }) => {
  console.log('dayData', data);
  const MARKET = data?.[0]?.market;
  const UNIT = MARKET?.split('-')[1];
  const QUOTE = MARKET?.split('-')[0];

  return (
    <div className="flex items-center my-2">
      <div className="flex flex-col px-4 w-1/2">
        <p className={`text-[20px] font-bold ${data?.[0]?.change_rate < 0 ? 'text-[#0062DF]' : 'text-[#DD3C44]'}`}>
          {data?.[0]?.trade_price.toLocaleString('ko-KR')} <span className="text-sm">{QUOTE}</span>
        </p>
        <div className="flex items-center gap-3">
          <p className={`text-sm ${data?.[0]?.change_rate < 0 ? 'text-[#0062DF]' : 'text-[#DD3C44]'}`}>
            {data?.[0]?.change_rate.toFixed(2)}%
          </p>
          <p className={`text-sm ${data?.[0]?.change_rate < 0 ? 'text-[#0062DF]' : 'text-[#DD3C44]'}`}>
            {data?.[0]?.change_price.toLocaleString('ko-KR')}
          </p>
        </div>
      </div>
      <div className="flex justify-end gap-2 px-4 py-2 w-1/2">
        <div className="flex flex-col gap-2 w-full">
          <Text size="xs" text="고가" price={data?.[0]?.high_price.toLocaleString('ko-KR')} priceColor="red" />
          <div className="h-[0.5px] bg-gray-200 w-full" />
          <Text size="xs" text="저가" price={data?.[0]?.low_price.toLocaleString('ko-KR')} priceColor="blue" />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Text
            size="xs"
            text="거래량"
            price={data?.[0]?.candle_acc_trade_volume.toLocaleString('ko-KR')}
            priceColor="black"
            type={UNIT}
          />
          <div className="h-[0.5px] bg-gray-200 w-full" />
          <Text
            size="xs"
            text="거래대금"
            price={data?.[0]?.candle_acc_trade_price.toLocaleString('ko-KR')}
            priceColor="black"
            type={QUOTE}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceInfo;
