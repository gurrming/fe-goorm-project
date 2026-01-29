import Text from '../../common/Text';

export default function MyAsset_Skeleton() {
  return (
    <div className="flex flex-col  gap-3 px-4 py-4">
      <p className="text-[15px] text-[#333333] font-bold">보유자산</p>
      <div className="flex justify-center w-full gap-20 border-b-[0.3px] border-gray-200 pb-3">
        <Text size="sm" text="보유잔액" price={0} priceColor="black" type="KRW" />
        <Text size="sm" text="총 보유자산" price={0} priceColor="black" type="KRW" />
      </div>
      <div className="flex justify-center w-full gap-20">
        <Text size="sm" text="총 매수" price={0} priceColor="black" type="KRW" />
        <Text size="sm" text="총평가손익" price={'-'} priceColor={'blue'} type="KRW" />
      </div>
      <div className="flex justify-center w-full gap-20">
        <Text size="sm" text="총 평가" price={'-'} priceColor="black" type="KRW" />
        <Text size="sm" text="총평가수익률" price={'-'} priceColor={'blue'} type="%" />
      </div>

      <Text size="sm" text="주문가능" price={0} priceColor="black" type="KRW" />
    </div>
  );
}
