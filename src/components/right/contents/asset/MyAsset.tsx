import { useGetMyAsset } from '../../../../api/asset/useGetAsset';
import { useGetPortfolio } from '../../../../api/useGetPortfolio';
import { useAsset } from '../../../../hooks/websocket/useAsset';
import useUserStore from '../../../../store/useUserStore';
import { useAssetStore } from '../../../../store/websocket/useAssetStore';
import Text from '../../../Text';

const MyAsset = () => {
  const { data: myAssetData } = useGetMyAsset();
  const { data: myPortfolioData } = useGetPortfolio();
  const user = useUserStore((state) => state.user);
  const memberId = user?.id;

  useAsset(memberId!);
  const { assetData, summary } = useAssetStore();
  console.log('assetData : ', assetData);
  console.log('summary : ', summary);

  return (
    <div className="flex flex-col items-center gap-3 px-4 pb-4">
      <div className="flex justify-center w-full gap-8 border-b-[0.3px] border-gray-200 pb-3">
        <Text
          size="sm"
          text="보유잔액"
          price={myAssetData?.assetCash.toLocaleString('ko-KR')}
          priceColor="black"
          type="KRW"
        />
        <Text
          size="sm"
          text="총 보유자산"
          price={myAssetData?.totalAsset.toLocaleString('ko-KR')}
          priceColor="black"
          type="KRW"
        />
      </div>
      <div className="flex justify-center w-full gap-8">
        <Text
          size="sm"
          text="총 매수"
          price={myPortfolioData?.summary.totalBuyAmount.toLocaleString('ko-KR')}
          priceColor="black"
          type="KRW"
        />
        <Text
          size="sm"
          text="총평가손익"
          price={myPortfolioData?.summary.totalProfit.toLocaleString('ko-KR')}
          priceColor="blue"
          type="KRW"
        />
      </div>
      <div className="flex justify-center w-full gap-8">
        <Text
          size="sm"
          text="총 평가"
          price={myPortfolioData?.summary.totalEvaluateAmount.toLocaleString('ko-KR')}
          priceColor="black"
          type="KRW"
        />
        <Text
          size="sm"
          text="총평가수익률"
          price={myPortfolioData?.summary.totalProfitRate.toLocaleString('ko-KR')}
          priceColor="blue"
          type="%"
        />
      </div>

      <Text
        size="sm"
        text="주문가능"
        price={myAssetData?.assetCash.toLocaleString('ko-KR')}
        priceColor="black"
        type="KRW"
      />
    </div>
  );
};

export default MyAsset;
