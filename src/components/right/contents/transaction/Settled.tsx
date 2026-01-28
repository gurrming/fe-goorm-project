import { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { Transaction_Skeleton } from './loading/Transaction_Skeleton';
import SettledItem from './SettledItem';
import { useGetInfiniteSettled } from '../../../../hooks/infinite/useGetInfiniteSettled';
import useUserStore from '../../../../store/useUserStore';
import type { TSettledData } from '../../../../types/transaction';

const Settled = () => {
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const { user } = useUserStore();
  if (!user) return null;
  const memberId = user.id;

  const { data: infiniteData, fetchNextPage, hasNextPage, isFetching, isPending } = useGetInfiniteSettled(memberId, 10);

  const settledList = useMemo(() => {
    return infiniteData?.pages.flat() || [];
  }, [infiniteData]);

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isPending) {
    return (
      <Transaction_Skeleton />
    );
  }

  return (
    <div className="max-h-[650px] overflow-y-auto w-full border-collapse bg-white">
      <table className="w-full border-collapse bg-white">
        <thead className="sticky top-0 z-10">
          <tr className="border-b border-t border-gray-200 bg-[#F7F7F7]">
            <th className="py-3 text-center text-[11px] font-medium text-[#666666] border-r border-gray-200">
              주문시간
            </th>
            <th className="py-3 text-center text-[11px] font-medium text-[#666666] border-r border-gray-200">
              <div className="flex flex-col">
                <span>마켓명</span>
                <span className="text-[11px] font-normal text-[#666666] mt-1">구분</span>
              </div>
            </th>
            <th className="py-3 text-center text-[11px] font-medium text-[#666666] border-r border-gray-200">
              <div className="flex flex-col">
                <span>체결가격</span>
              </div>
            </th>
            <th className="py-3 text-center text-[11px] font-medium text-[#666666]">체결수량</th>
          </tr>
        </thead>
        <tbody>
          {settledList.length > 0 ? (
            settledList.map((item: TSettledData) => <SettledItem key={item.tradeId} item={item} />)
          ) : (
            <tr>
              <td colSpan={10} className="text-[13px] text-center text-[#666666] border-b border-gray-200 py-10">
                채결 내역이 없습니다.
              </td>
            </tr>
          )}
          <tr ref={ref} />
        </tbody>
      </table>
    </div>
  );
};

export default Settled;
