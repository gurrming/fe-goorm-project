import { useAssetStore } from '../../store/websocket/useAssetStore';
import Text from '../common/Text';

const MyAsset = () => {
  const { assetCash, wsTotalAsset, totalAsset, summary } = useAssetStore();

  return (
    <div className="flex flex-col items-center gap-3 px-4 pb-4">
      <div className="flex justify-center w-full gap-8 border-b-[0.3px] border-gray-200 pb-3">
        <Text size="sm" text="보유잔액" price={assetCash?.toLocaleString('ko-KR')} priceColor="black" type="KRW" />
        <Text
          size="sm"
          text="총 보유자산"
          price={wsTotalAsset?.toLocaleString('ko-KR') ?? totalAsset?.toLocaleString('ko-KR')}
          priceColor="black"
          type="KRW"
        />
      </div>
      <div className="flex justify-center w-full gap-8">
        <Text
          size="sm"
          text="총 매수"
          price={(summary?.totalBuyAmount ?? 0).toLocaleString('ko-KR')}
          priceColor="black"
          type="KRW"
        />
        <Text
          size="sm"
          text="총평가손익"
          price={(summary?.totalProfit ?? 0).toLocaleString('ko-KR')}
          priceColor={summary?.totalProfit && summary?.totalProfit > 0 ? 'red' : 'blue'}
          type="KRW"
        />
      </div>
      <div className="flex justify-center w-full gap-8">
        <Text
          size="sm"
          text="총 평가"
          price={(summary?.totalEvaluation ?? 0).toLocaleString('ko-KR')}
          priceColor="black"
          type="KRW"
        />
        <Text
          size="sm"
          text="총평가수익률"
          price={(summary?.totalProfitRate ?? 0).toLocaleString('ko-KR')}
          priceColor={summary?.totalProfitRate && summary?.totalProfitRate > 0 ? 'red' : 'blue'}
          type="%"
        />
      </div>

      <Text size="sm" text="주문가능" price={assetCash?.toLocaleString('ko-KR')} priceColor="black" type="KRW" />
    </div>
  );
};

export default MyAsset;
