import { mockUnSettledData } from './mockData';

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
            <th className="px-4 py-3 text-center text-[11px] font-medium text-[#666666] border-r border-gray-200">
              주문시간
            </th>
            <th className="px-4 py-3 text-center text-[11px] font-medium text-[#666666] border-r border-gray-200">
              구분
            </th>
            <th className="px-4 py-3 text-center text-[11px] font-medium text-[#666666] border-r border-gray-200">
              <div className="flex flex-col">
                <span>감시가격</span>
                <span className="text-[11px] font-normal text-[#666666] mt-1">주문금액</span>
              </div>
            </th>
            <th className="px-4 py-3 text-center text-[11px] font-medium text-[#666666] border-r border-gray-200">
              <div className="flex flex-col">
                <span>주문량</span>
                <span className="text-[11px] font-normal text-[#666666] mt-1">미체결량</span>
              </div>
            </th>
            <th className="px-4 py-3 text-center text-[11px] font-medium text-[#666666] ">주문취소</th>
          </tr>
        </thead>
        <tbody>
          {mockUnSettledData.map((item, index) => (
            <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="px-4 py-3 text-xs text-[#333333] border-r border-gray-200">{item.orderTime}</td>
              <td
                className={`px-4 py-3 text-xs text-center ${item.type === '매수' ? 'text-[#DD3C44]' : 'text-[#0062DF]'} border-r border-gray-200`}
              >
                {item.type}
              </td>
              <td className="px-4 py-3 text-xs text-[#333333] border-r border-gray-200">
                <div className="flex flex-col gap-1">
                  <span className="text-right">{item.watchPrice.toLocaleString('ko-KR')}</span>
                  <span className="text-right">{item.watchAmount.toLocaleString('ko-KR')}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-xs text-[#333333] text-right border-r border-gray-200">
                {item.watchQuantity.toLocaleString('ko-KR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 8,
                })}
              </td>
              <td className="px-4 py-3 text-xs text-[#333333] text-right">
                <button className="text-xs text-[#333333] border border-gray-200 rounded-sm px-2 py-1 hover:cursor-pointer">
                  주문취소
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UnSettled;
