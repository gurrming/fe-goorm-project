import OrderBookItem from './OrderBookItem';
import useCategoryIdStore from '../../store/useCategoryId';
import { useOrderbookStore } from '../../store/websocket/useOrderbookStore';

export default function AskBook() {
  const categoryId = useCategoryIdStore((state) => state.categoryId);
  const payload = useOrderbookStore((state) => state.orderbookData[categoryId]);
  const sellSide = payload?.sellSide ?? [];

  // 최대 물량 계산 (차트 비율 계산용)
  const maxVolume = Math.max(0, ...sellSide.map((item) => item.volume));

  return (
    <div className="col-span-2 flex flex-col">
      {sellSide.length === 0 ? (
        <div className="text-center text-gray-400 text-[10px] py-4">매도 호가 데이터가 없습니다</div>
      ) : (
        sellSide.map((item) => <OrderBookItem key={item.price} item={item} isAsk={true} maxVolume={maxVolume} />)
      )}
    </div>
  );
}
