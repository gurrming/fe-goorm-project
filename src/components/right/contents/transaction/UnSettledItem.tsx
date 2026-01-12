import { usePatchCancel } from '../../../../api/orders/usePatchCancel';
import type { TUnSettledData } from '../../../../types/transaction';

const UnSettledItem = ({ item, index }: { item: TUnSettledData; index: number }) => {
  const { mutate: cancel } = usePatchCancel();
  const date = new Date(item.orderTime);
  date.setHours(date.getHours() + 9);
  const TIME = date.toLocaleString('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
  return (
    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
      <td className="px-4 py-3 text-xs text-[#333333] border-r border-gray-200">{TIME}</td>
      <td className={`px-4 py-3 text-xs text-center text-nowrap border-r border-gray-200`}>
        <div className="flex flex-col">
          <span className="text-center text-bold ">{item.symbol}</span>
          <span
            className={`text-[11px] font-normal text-[#666666] mt-1 ${item.orderType === 'BUY' ? 'text-[#DD3C44]' : 'text-[#0062DF]'}`}
          >
            {item.orderType === 'BUY' ? '매수' : '매도'}
          </span>
        </div>
      </td>
      <td className="px-4 py-3 text-xs text-[#333333] border-r border-gray-200">
        {item.orderPrice.toLocaleString('ko-KR')}
      </td>
      <td className="px-4 py-3 text-xs text-[#333333] text-right border-r border-gray-200">
        <div className="flex flex-col gap-1">
          <span className="text-right">
            {item.orderCount.toLocaleString('ko-KR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 8,
            })}
          </span>
          <span className="text-right">
            {item.remainingCount.toLocaleString('ko-KR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 8,
            })}
          </span>
        </div>
      </td>
      <td className="px-4 py-3 text-xs text-[#333333] text-right">
        <button
          onClick={() => {
            cancel({ orderId: item.orderId });
          }}
          className="text-xs text-[#333333] text-nowrap border border-gray-200 rounded-sm px-2 py-1 hover:cursor-pointer"
        >
          주문취소
        </button>
      </td>
    </tr>
  );
};

export default UnSettledItem;
