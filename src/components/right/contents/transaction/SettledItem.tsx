import type { TSettledData } from '../../../../types/transaction';

const SettledItem = ({ item }: { item: TSettledData }) => {
  const date = new Date(item.tradeTime);
  date.setHours(date.getHours());
  const TIME = date.toLocaleString('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
  return (
    <tr key={item.tradeId} className="border-b border-gray-200 hover:bg-gray-50">
      <td className="px-4 py-3 text-xs text-[#333333] border-r border-gray-200">{TIME}</td>
      <td className={`px-4 py-3 text-xs text-center  border-r border-gray-200`}>
        <div className="flex flex-col gap-1">
          <span>{item.symbol}</span>
          <span className={`${item.myOrderType === 'SELL' ? 'text-[#0062DF]' : 'text-[#DD3C44]'}`}>
            {item.myOrderType === 'SELL' ? '매도' : '매수'}
          </span>
        </div>
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
