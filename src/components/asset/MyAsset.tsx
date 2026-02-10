import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import MyAsset_Skeleton from './loading/MyAsset_Skeleton';
import { formatInteger } from '../../lib/price';
import { useAssetStore } from '../../store/websocket/useAssetStore';
import Text from '../common/Text';

const MyAsset = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { myAsset, wsTotalAsset, summary } = useAssetStore(
    useShallow((state) => ({
      myAsset: state.myAsset,
      wsTotalAsset: state.wsTotalAsset,
      summary: state.summary,
    })),
  );

  useEffect(() => {
    // myAsset 데이터가 로드되면 로딩 종료
    if (myAsset.assetCash !== null || myAsset.totalAsset !== null || myAsset.assetCanOrder !== null) {
      setIsLoading(false);
    }
  }, [myAsset]);

  if (isLoading) {
    return <MyAsset_Skeleton />;
  }

  return (
    <div className="flex flex-col  gap-3 px-4 py-4">
      <p className="text-[15px] text-[#333333] font-bold">보유자산</p>
      <div className="flex justify-center w-full gap-20 border-b-[0.3px] border-gray-200 pb-3">
        <Text
          data-testid="asset-cash"
          size="sm"
          text="보유잔액"
          price={formatInteger(myAsset.assetCash)}
          priceColor="black"
          type="KRW"
        />
        <Text
          size="sm"
          text="총 보유자산"
          price={formatInteger(wsTotalAsset ?? myAsset.totalAsset)}
          priceColor="black"
          type="KRW"
        />
      </div>
      <div className="flex justify-center w-full gap-20">
        <Text size="sm" text="총 매수" price={formatInteger(summary?.totalBuyAmount)} priceColor="black" type="KRW" />
        <Text
          size="sm"
          text="총평가손익"
          price={formatInteger(summary?.totalProfit)}
          priceColor={summary?.totalProfit && summary?.totalProfit > 0 ? 'red' : 'blue'}
          type="KRW"
        />
      </div>
      <div className="flex justify-center w-full gap-20">
        <Text size="sm" text="총 평가" price={formatInteger(summary?.totalEvaluation)} priceColor="black" type="KRW" />
        <Text
          size="sm"
          text="총평가수익률"
          price={(summary?.totalProfitRate ?? 0).toLocaleString('ko-KR')}
          priceColor={summary?.totalProfitRate && summary?.totalProfitRate > 0 ? 'red' : 'blue'}
          type="%"
        />
      </div>

      <Text size="sm" text="주문가능" price={formatInteger(myAsset.assetCanOrder)} priceColor="black" type="KRW" />
    </div>
  );
};

export default MyAsset;
