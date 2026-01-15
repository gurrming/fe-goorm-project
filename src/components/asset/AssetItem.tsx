import type { TAssets } from '../../types/asset';

const AssetItem = ({ item }: { item: TAssets }) => {
  const numberOption = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="px-2 py-3 text-xs text-[#333333] text-center border-r border-gray-200 flex flex-col gap-1">
        <p className="text-xs font-semibold">{item.categoryName}</p>
        <p className="text-[10px] text-gray-500">{item.symbol}</p>
      </td>
      <td className="pr-2 py-3 text-xs text-[#333333] text-right border-r border-gray-200">
        {item.investCount?.toLocaleString('ko-KR', numberOption)}
      </td>
      <td className="pr-2 py-3 text-xs text-[#333333] text-right border-r border-gray-200">
        {item.avgPrice?.toLocaleString('ko-KR', numberOption)}
      </td>
      <td className="pr-2 py-3 text-xs text-[#333333] text-right border-r border-gray-200">
        {item.buyAmount?.toLocaleString('ko-KR', numberOption)}
      </td>
      <td className="pr-2 py-3 text-xs text-[#333333] text-right border-r border-gray-200">
        {item.evaluationAmount?.toLocaleString('ko-KR', numberOption)}
      </td>
      <td
        className={`pr-2 py-3 text-xs text-[#333333] text-right border-r border-gray-200 ${item.evaluationProfit && item.evaluationProfit > 0 ? 'text-red-500' : 'text-blue-500'}`}
      >
        {item.evaluationProfit?.toLocaleString('ko-KR', numberOption)}
      </td>
    </tr>
  );
};

export default AssetItem;
