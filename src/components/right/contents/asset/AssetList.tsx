import AssetItem from './AssetItem';
import { useGetPortfolio } from '../../../../api/useGetPortfolio';
import { useAsset } from '../../../../hooks/websocket/useAsset';
import useUserStore from '../../../../store/useUserStore';
import { useAssetStore } from '../../../../store/websocket/useAssetStore';
import type { TAssets } from '../../../../types/asset';

const AssetList = () => {
  const { data } = useGetPortfolio();
  const user = useUserStore((state) => state.user);
  const memberId = user?.id;
  useAsset(memberId!);
  const { assetData } = useAssetStore();
  console.log('assetData : ', assetData);

  // finalData 생성: useGetPortfolio의 기본 정보 + useAssetStore의 평가금액, 평가손익
  const finalData =
    data?.assets?.map((item: TAssets) => ({
      categoryId: item.categoryId,
      categoryName: item.categoryName,
      symbol: item.symbol,
      quantity: item.quantity,
      avgBuyPrice: item.avgBuyPrice,
      buyAmount: item.buyAmount,
      evaluateAmount: assetData?.evaluateAmount ?? item.evaluateAmount,
      profit: assetData?.profit ?? item.profit,
      profitRate: item.profitRate,
    })) ?? [];

  return (
    <div className="flex flex-col gap-3 border-t-[0.3px] border-gray-200 pt-3">
      <p className="text-[15px] text-[#333333] px-4">보유자산 목록</p>
      <table className="w-full border-collapse bg-white text-nowrap">
        <thead>
          <tr className="border-b border-t border-gray-200 bg-[#F7F7F7]">
            <th className=" py-3 text-center text-[11px] font-medium text-[#666666] border-r border-gray-200">
              보유자산
            </th>
            <th className=" py-3 text-center text-[11px] font-medium text-[#666666] border-r border-gray-200">
              보유수량
            </th>
            <th className=" py-3 text-center text-[11px] font-medium text-[#666666] border-r border-gray-200">
              매수평균가
            </th>
            <th className=" py-3 text-center text-[11px] font-medium text-[#666666] border-r border-gray-200">
              매수금액
            </th>
            <th className=" py-3 text-center text-[11px] font-medium text-[#666666] border-r border-gray-200">
              평가금액
            </th>
            <th className=" py-3 text-center text-[11px] font-medium text-[#666666]">평가손익</th>
          </tr>
        </thead>
        <tbody className="max-h-[300px] overflow-hidden">
          {finalData && finalData.length > 0 ? (
            finalData.map((item: TAssets) => <AssetItem key={item.categoryId} item={item} />)
          ) : (
            <tr>
              <td colSpan={10} className="text-[13px] text-center text-[#666666] border-b border-gray-200 py-10">
                보유 자산이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AssetList;
