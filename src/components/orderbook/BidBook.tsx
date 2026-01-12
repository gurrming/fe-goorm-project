import OrderBookItem from './OrderBookItem';
import useCategoryIdStore from '../../store/useCategoryId';
import { useOrderbookStore } from '../../store/websocket/useOrderbookStore';

export default function BidBook() {
  const categoryId = useCategoryIdStore((state) => state.categoryId);
  const payload = useOrderbookStore((state) => state.orderbookData[categoryId]);
  const buySide = payload?.buySide ?? [];

  // 최대 물량 계산 (차트 비율 계산용)
  const maxVolume = Math.max(0, ...buySide.map((item) => item.volume));

  return (
    <div className="col-span-2 flex flex-col">
      {buySide.length === 0 ? (
        <div className="text-center text-gray-400 text-[10px] py-4">매수 호가 데이터가 없습니다</div>
      ) : (
        buySide.map((item, index) => (
          <OrderBookItem key={`${item.price ?? index}`} item={item} isAsk={false} maxVolume={maxVolume} />
        ))
      )}
    </div>
  );
}
