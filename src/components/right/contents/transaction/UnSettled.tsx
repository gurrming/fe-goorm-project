import { mockUnSettledData } from './mockData';
import UnSettledItem from './UnSettledItem';

const UnSettled = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <p className="text-xs text-[#333333]">총 {mockUnSettledData.length}건</p>{' '}
        <button className="text-xs text-[#DD3C44] bg-[#ffdad9] px-2 py-1 rounded-sm hover:cursor-pointer">
          전체 취소
        </button>
      </div>
      <table className="w-full border-collapse bg-white">
        <thead>
          <tr className="border-b border-t border-gray-200 bg-[#F7F7F7]">
            <th className="py-3 text-center text-[11px] font-medium text-[#666666] border-r border-gray-200">
              주문시간
            </th>
            <th className="py-3 text-center text-[11px] font-medium text-[#666666] border-r border-gray-200">구분</th>
            <th className="py-3 text-center text-[11px] font-medium text-[#666666] border-r border-gray-200">
              <div className="flex flex-col">
                <span>감시가격</span>
                <span className="text-[11px] font-normal text-[#666666] mt-1">주문금액</span>
              </div>
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
          {mockUnSettledData.map((item, index) => (
            <UnSettledItem item={item} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UnSettled;
