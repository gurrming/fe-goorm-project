import { mockBidData } from './mockData';
import OrderBookItem from './OrderBookItem';

export default function BidBook() {
  // 최대 물량 계산 (차트 비율 계산용)
  const maxVolume = Math.max(...mockBidData.map((item) => item.volume));

  return (
    <div className="col-span-2 flex flex-col">
      {mockBidData.map((item, index) => (
        <OrderBookItem key={index} item={item} isAsk={false} maxVolume={maxVolume} />
      ))}
    </div>
  );
}
