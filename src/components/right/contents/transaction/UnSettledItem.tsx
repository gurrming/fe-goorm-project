import type { TUnSettledData } from '../../../../types/transaction';

const UnSettledItem = ({ item, index }: { item: TUnSettledData; index: number }) => {
  return (
    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
      <td className="px-4 py-3 text-xs text-[#333333] border-r border-gray-200">{item.orderTime}</td>
      <td
        className={`px-4 py-3 text-xs text-center text-nowrap ${item.type === '매수' ? 'text-[#DD3C44]' : 'text-[#0062DF]'} border-r border-gray-200`}
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
        <button className="text-xs text-[#333333] text-nowrap border border-gray-200 rounded-sm px-2 py-1 hover:cursor-pointer">
          주문취소
        </button>
      </td>
    </tr>
  );
};

export default UnSettledItem;
