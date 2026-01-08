import UnSettledItem from './UnSettledItem';
import { usePatchCancelAll } from '../../../../api/orders/usePatchCancelAll';
import { useGetUnSettledData } from '../../../../api/transaction/useGetUnSettledData';
import type { TUnSettledData } from '../../../../types/transaction';

const UnSettled = () => {
  const { data, refetch } = useGetUnSettledData();
  const { mutate: cancelAll } = usePatchCancelAll();
  console.log('미체결 내역 : ', data);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center px-4">
        <p className="text-xs text-[#333333]">총 {data?.length}건</p>{' '}
        <button
          onClick={() => {
            cancelAll();
            refetch();
          }}
          className={`text-xs text-[#DD3C44] bg-[#ffdad9] px-2 py-1 rounded-sm ${!data || data.length === 0 ? 'opacity-50 hover:cursor-not-allowed' : 'hover:cursor-pointer'}`}
        >
          전체 취소
        </button>
      </div>
      <table className="w-full border-collapse bg-white">
        <thead>
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
          {data && data.length > 0 ? (
            data.map((item: TUnSettledData, index: number) => (
              <UnSettledItem item={item} index={index} refetch={refetch} />
            ))
          ) : (
            <tr>
              <td colSpan={10} className="text-[13px] text-center text-[#666666] border-b border-gray-200 py-10">
                미체결 내역이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UnSettled;
