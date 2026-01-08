import type { TAssets } from '../../../../types/asset';

const AssetItem = ({ item }: { item: TAssets }) => {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="px-2 py-3 text-xs text-[#333333] text-center border-r border-gray-200">{item.categoryName}</td>
      <td className="pr-2 py-3 text-xs text-[#333333] text-right border-r border-gray-200">
        {item.quantity.toLocaleString('ko-KR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 8,
        })}
      </td>
      <td className="pr-2 py-3 text-xs text-[#333333] text-right border-r border-gray-200">
        {item.avgBuyPrice.toLocaleString('ko-KR')}
      </td>
      <td className="pr-2 py-3 text-xs text-[#333333] text-right border-r border-gray-200">
        {item.buyAmount.toLocaleString('ko-KR')}
      </td>
      <td className="pr-2 py-3 text-xs text-[#333333] text-right border-r border-gray-200">
        {item.evaluateAmount.toLocaleString('ko-KR')}
      </td>
      <td className="pr-2 py-3 text-xs text-[#333333] text-right border-r border-gray-200">
        {item.profit.toLocaleString('ko-KR')}
      </td>
    </tr>
  );
};

export default AssetItem;
