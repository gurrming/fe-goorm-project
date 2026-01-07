import type { TSettledData } from '../../../../types/transaction';

const SettledItem = ({ item, index }: { item: TSettledData; index: number }) => {
  return (
    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
      <td className="px-4 py-3 text-xs text-[#333333] border-r border-gray-200">{item.tradeTime}</td>
      <td
        className={`px-4 py-3 text-xs text-center ${item.takerType === '매수' ? 'text-[#DD3C44]' : 'text-[#0062DF]'} border-r border-gray-200`}
      >
        {item.takerType}
      </td>
      <td className="px-4 py-3 text-xs text-[#333333] border-r border-gray-200">
        <div className="flex flex-col gap-1">
          <span className="text-right">{item.tradePrice.toLocaleString('ko-KR')}</span>
        </div>
      </td>
      <td className="px-4 py-3 text-xs text-[#333333] text-right">
        {item.tradeCount.toLocaleString('ko-KR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 8,
        })}
      </td>
    </tr>
  );
};

export default SettledItem;
