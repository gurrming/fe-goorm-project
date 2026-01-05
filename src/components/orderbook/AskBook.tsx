import { mockAskData } from './mockData';
import OrderBookItem from './OrderBookItem';

export default function AskBook() {
  // 최대 물량 계산 (차트 비율 계산용)
  const maxVolume = Math.max(...mockAskData.map((item) => item.volume));

  return (
    <div className="col-span-2 flex-col">
      {mockAskData.map((item, index) => (
        <OrderBookItem key={index} item={item} isAsk={true} maxVolume={maxVolume} />
      ))}
    </div>
  );
}
