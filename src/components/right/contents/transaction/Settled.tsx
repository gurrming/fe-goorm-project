import { mockSettledData } from './mockData';
import SettledItem from './SettledItem';

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
          <SettledItem item={item} index={index} />
        ))}
      </tbody>
    </table>
  );
};

export default Settled;
