import React from 'react';
import Text from '../../../Text';

const MyAsset = () => {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex justify-center w-full gap-8 border-b-[0.3px] border-gray-200 pb-3">
        <Text size="sm" text="보유잔액" price="100,000,000" priceColor="black" type="KRW" />
        <Text size="sm" text="총 보유자산" price="100,000,000" priceColor="black" type="KRW" />
      </div>
      <div className="flex justify-center w-full gap-8">
        <Text size="sm" text="총 매수" price="350,999" priceColor="black" type="KRW" />
        <Text size="sm" text="총평가손익" price="-74630" priceColor="blue" type="KRW" />
      </div>
      <div className="flex justify-center w-full gap-8">
        <Text size="sm" text="총 평가" price="276,292" priceColor="black" type="KRW" />
        <Text size="sm" text="총평가수익률" price="-21.26" priceColor="blue" type="%" />
      </div>

      <Text size="sm" text="주문가능" price="622" priceColor="black" type="KRW" />
    </div>
  );
};

export default MyAsset;
