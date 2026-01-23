import OrderBookItem from './OrderBookItem';
import useCategoryIdStore from '../../store/useCategoryId';
import { useOrderbookStore } from '../../store/websocket/useOrderbookStore';
import type { OrderbookItemData } from '../../types/websocket';

export default function SellBook() {
  const categoryId = useCategoryIdStore((state) => state.categoryId);
  const payload = useOrderbookStore((state) => state.orderbookData[categoryId]);
  const sellSide = payload?.sellSide || [];

  // 디버깅: 매도 호가창 데이터 확인
  if (sellSide.length > 0) {
    console.log('[SellBook] 매도 호가창 데이터:', {
      categoryId,
      sellSideCount: sellSide.length,
      sellItemsCount: sellSide.filter((item) => Number(item.totalRemainingCount) > 0).length,
      sample: sellSide.slice(0, 3),
    });
  }

  const sellItems = sellSide.filter((item) => Number(item.totalRemainingCount) > 0);
  const maxVolume =
    sellItems.length > 0 ? Math.max(0, ...sellItems.map((item) => Number(item.totalRemainingCount))) : 0;

  return (
    <div className="col-span-2 flex flex-col">
      {sellItems.length > 0 ? (
        sellItems.map((item: OrderbookItemData, index) => (
          <OrderBookItem key={`${item.orderPrice}-${index}`} item={item} isSell={true} maxVolume={maxVolume} />
        ))
      ) : (
        <div className="text-center text-gray-400 text-[10px] py-4">매도 호가 데이터가 없습니다</div>
      )}
    </div>
  );
}
