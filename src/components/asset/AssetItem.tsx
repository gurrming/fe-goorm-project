import { memo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { formatInteger } from '../../lib/price';
import { useAssetStore } from '../../store/websocket/useAssetStore';
import type { TAssets } from '../../types/asset';

const AssetItem = memo(
  ({ item }: { item: TAssets }) => {
    const wsData = useAssetStore(
      useShallow((state) =>
        state.wsAssetList.find(
          (ws: { categoryId: number; evaluationAmount: number; evaluationProfit: number }) =>
            ws.categoryId === item.categoryId,
        ),
      ),
    );

    const currentEvaluationAmount = wsData?.evaluationAmount ?? item.evaluationAmount;
    const currentEvaluationProfit = wsData?.evaluationProfit ?? item.evaluationProfit;

    return (
      <tr className="border-b border-gray-200 hover:bg-gray-50">
        <td className="px-2 py-3 text-xs text-[#333333] text-center border-r border-gray-200 flex flex-col gap-1">
          <p className="text-xs font-semibold">{item.categoryName}</p>
          <p className="text-[10px] text-gray-500">{item.symbol}</p>
        </td>
        <td className="pr-2 py-3 text-xs text-[#333333] text-right border-r border-gray-200">{item.investCount}</td>
        <td className="pr-2 py-3 text-xs text-[#333333] text-right border-r border-gray-200">
          {formatInteger(item.avgPrice)}
        </td>
        <td className="pr-2 py-3 text-xs text-[#333333] text-right border-r border-gray-200">
          {formatInteger(item.buyAmount)}
        </td>
        <td className="pr-2 py-3 text-xs text-[#333333] text-right border-r border-gray-200">
          {formatInteger(currentEvaluationAmount)}
        </td>
        <td
          className={`pr-2 py-3 text-xs text-[#333333] text-right border-r border-gray-200 ${currentEvaluationProfit && currentEvaluationProfit > 0 ? 'text-red-500' : 'text-blue-500'}`}
        >
          {formatInteger(currentEvaluationProfit)}
        </td>
      </tr>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.item.symbol === nextProps.item.symbol &&
      prevProps.item.evaluationProfit === nextProps.item.evaluationProfit &&
      prevProps.item.buyAmount === nextProps.item.buyAmount &&
      prevProps.item.evaluationAmount === nextProps.item.evaluationAmount &&
      prevProps.item.categoryName === nextProps.item.categoryName &&
      prevProps.item.investCount === nextProps.item.investCount
    );
  },
);

export default AssetItem;
