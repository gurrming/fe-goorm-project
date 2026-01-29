import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import UnSettledItem from './UnSettledItem';
import { usePatchCancelAll } from '../../../../api/orders/usePatchCancelAll';
import { useGetInfiniteUnSettled } from '../../../../hooks/infinite/useGetInfiniteUnSettled';
import useUserStore from '../../../../store/useUserStore';
import type { TUnSettledData } from '../../../../types/transaction';
import { Loading_Spinner } from '@/components/common/loading/Loading_Spinner';

const UnSettled = () => {
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const { user } = useUserStore();
  if (!user) return null;
  const memberId = user.id;

  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isPending,
  } = useGetInfiniteUnSettled(memberId, 10);
  const totalOpenOrderCount = infiniteData?.pages[0]?.totalOpenOrderCount;

  const { mutate: cancelAll } = usePatchCancelAll();

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center px-4">
        <p className="text-xs text-[#333333]">총 {totalOpenOrderCount}건</p>{' '}
        <button
          onClick={() => {
            cancelAll();
          }}
          className={`text-xs text-[#DD3C44] bg-[#ffdad9] px-2 py-1 rounded-sm ${!infiniteData?.pages || infiniteData?.pages.length === 0 || infiniteData?.pages.every((page) => !page?.orders?.content || page.orders.content.length === 0) ? 'opacity-50 hover:cursor-not-allowed' : 'hover:cursor-pointer'}`}
        >
          전체 취소
        </button>
      </div>
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
                <span className="text-[11px] font-normal text-[#666666] mt-1">주문금액</span>
              </th>
              <th className="py-3 text-center text-[11px] font-medium text-[#666666] border-r border-gray-200">
                <div className="flex flex-col">
                  <span>주문량</span>
                  <span className="text-[11px] font-normal text-[#666666] mt-1">미체결량</span>
                </div>
              </th>
              <th className="py-3 text-center text-[11px] font-medium text-[#666666] ">주문취소</th>
            </tr>
          </thead>
          <tbody>
            {isPending ? (
              <tr>
                <td colSpan={10} className="h-[300px]">
                  <Loading_Spinner />
                </td>
              </tr>
            ) : infiniteData?.pages &&
              infiniteData.pages.some((page) => page?.orders?.content && page.orders.content.length > 0) ? (
              infiniteData?.pages.map((page) =>
                page?.orders?.content?.map((item: TUnSettledData) => <UnSettledItem key={item.orderId} item={item} />),
              )
            ) : (
              <tr>
                <td colSpan={10} className="text-[13px] text-center text-[#666666] border-b border-gray-200 py-10">
                  미체결 내역이 없습니다.
                </td>
              </tr>
            )}
            <tr ref={ref} />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UnSettled;
