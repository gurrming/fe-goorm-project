import type { TAssetData } from '../../../../types/transaction';

const AssetItem = ({ item, index }: { item: TAssetData; index: number }) => {
  return (
    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
      <td className="px-2 py-3 text-xs text-[#333333] text-center border-r border-gray-200">{item.asset}</td>
      <td className="pr-2 py-3 text-xs text-[#333333] text-right border-r border-gray-200">
        {item.quantity.toLocaleString('ko-KR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 8,
        })}
      </td>
      <td className="pr-2 py-3 text-xs text-[#333333] text-right border-r border-gray-200">
        {item.averagePrice.toLocaleString('ko-KR')}
      </td>
      <td className="pr-2 py-3 text-xs text-[#333333] text-right border-r border-gray-200">
        {item.purchaseAmount.toLocaleString('ko-KR')}
      </td>
      <td className="pr-2 py-3 text-xs text-[#333333] text-right border-r border-gray-200">
        {item.evaluationAmount.toLocaleString('ko-KR')}
      </td>
      <td className="pr-2 py-3 text-xs text-[#333333] text-right border-r border-gray-200">
        {item.profitAndLoss.toLocaleString('ko-KR')}
      </td>
    </tr>
  );
};

export default AssetItem;
