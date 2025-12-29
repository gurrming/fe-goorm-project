import { mockSettledData } from './mockData';

const Settled = () => {
  return (
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
              <span>체결가격</span>
              <span className="text-[11px] font-normal text-[#666666] mt-1">체결금액</span>
            </div>
          </th>
          <th className="px-4 py-3 text-center text-[11px] font-medium text-[#666666]">체결수량</th>
        </tr>
      </thead>
      <tbody>
        {mockSettledData.map((item, index) => (
          <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
            <td className="px-4 py-3 text-xs text-[#333333] border-r border-gray-200">{item.orderTime}</td>
            <td
              className={`px-4 py-3 text-xs text-center ${item.type === '매수' ? 'text-[#DD3C44]' : 'text-[#0062DF]'} border-r border-gray-200`}
            >
              {item.type}
            </td>
            <td className="px-4 py-3 text-xs text-[#333333] border-r border-gray-200">
              <div className="flex flex-col gap-1">
                <span className="text-right">{item.executionPrice.toLocaleString('ko-KR')}</span>
                <span className="text-right">{item.executionAmount.toLocaleString('ko-KR')}</span>
              </div>
            </td>
            <td className="px-4 py-3 text-xs text-[#333333] text-right">
              {item.executionQuantity.toLocaleString('ko-KR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 8,
              })}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Settled;
