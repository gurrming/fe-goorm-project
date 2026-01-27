import { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import AssetItem from './AssetItem';
import { useGetInfiniteInvest } from '../../hooks/infinite/useGetInfiniteInvest';
import { useAsset, useSummary } from '../../hooks/websocket/useAsset';
import useUserStore from '../../store/useUserStore';
import { useAssetStore } from '../../store/websocket/useAssetStore';
import type { TAssets } from '../../types/asset';

const AssetList = () => {
  const user = useUserStore((state) => state.user);
  const memberId = user?.id;
  const { data: investData, fetchNextPage, hasNextPage, isFetching } = useGetInfiniteInvest(memberId!, 10);
  const { setSummary, setAssetList } = useAssetStore();
  useAsset(memberId!);
  useSummary(memberId!);

  useEffect(() => {
    if (investData) {
      const totalBuyAmount: number = investData.pages[0].totalBuyAmount;
      const totalEvaluation: number = investData.pages[0].totalEvaluation;
      const totalProfit: number = investData.pages[0].totalProfit;
      const totalProfitRate: number = investData.pages[0].totalProfitRate;

      const summary = {
        totalBuyAmount,
        totalEvaluation,
        totalProfit,
        totalProfitRate,
      };
      
      setSummary(summary);
    }
  }, [investData, setSummary]);

  const assetListData = useMemo(() => {
    return investData?.pages.flatMap((page) => page.assetList) || [];
  }, [investData]);

  useEffect(() => {
    if (assetListData) {
      setAssetList(assetListData);
    }
  }, [assetListData, setAssetList]);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  return (
    <div className="h-[600px] overflow-y-auto flex flex-col gap-3 border-t-[0.3px] border-gray-200 pt-3">
      <p className="text-[15px] text-[#333333] font-bold px-4">보유자산 목록</p>
      <table className="w-full border-collapse bg-white text-nowrap">
        <thead className="sticky top-0 z-10 border-b border-gray-200">
          <tr className="border-b border-t border-gray-200 bg-[#F7F7F7]">
            <th className=" py-2 text-center text-[11px] font-medium text-[#666666] border-r border-gray-200">
              보유자산
            </th>
            <th className=" py-2 text-center text-[11px] font-medium text-[#666666] border-r border-gray-200">
              보유수량
            </th>
            <th className=" py-2 text-center text-[11px] font-medium text-[#666666] border-r border-gray-200">
              매수평균가
            </th>
            <th className=" py-2 text-center text-[11px] font-medium text-[#666666] border-r border-gray-200">
              매수금액
            </th>
            <th className=" py-2 text-center text-[11px] font-medium text-[#666666] border-r border-gray-200">
              평가금액
            </th>
            <th className=" py-2 text-center text-[11px] font-medium text-[#666666]">평가손익</th>
          </tr>
        </thead>
        <tbody>
          {assetListData && assetListData.length > 0 ? (
            assetListData.map((item: TAssets) => <AssetItem key={item.symbol} item={item} />)
          ) : (
            <tr>
              <td colSpan={10} className="text-[13px] text-center text-[#666666] border-b border-gray-200 py-10">
                보유 자산이 없습니다.
              </td>
            </tr>
          )}
          <tr ref={ref} />
        </tbody>
      </table>
    </div>
  );
};

export default AssetList;
