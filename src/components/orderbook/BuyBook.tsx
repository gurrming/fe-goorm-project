import OrderBookItem from './OrderBookItem';
import useCategoryIdStore from '../../store/useCategoryId';
import { useOrderbookStore } from '../../store/websocket/useOrderbookStore';
import type { OrderbookItemData } from '../../types/websocket';

export default function BuyBook() {
  const categoryId = useCategoryIdStore((state) => state.categoryId);
  const payload = useOrderbookStore((state) => state.orderbookData[categoryId]);
  const buySide = payload?.buySide || [];

  // 디버깅: 매수 호가창 데이터 확인
  if (buySide.length > 0) {
    console.log('[BuyBook] 매수 호가창 데이터:', {
      categoryId,
      buySideCount: buySide.length,
      buyItemsCount: buySide.filter((item) => Number(item.totalRemainingCount) > 0).length,
      sample: buySide.slice(0, 3),
    });
  }

  const buyItems = buySide.filter((item) => Number(item.totalRemainingCount) > 0);

  // 최대 물량 계산 (차트 비율 계산용)
  const maxVolume = buyItems.length > 0 ? Math.max(0, ...buyItems.map((item) => Number(item.totalRemainingCount))) : 0;

  return (
    <div className="col-span-2 flex flex-col">
      {buyItems.length > 0 ? (
        buyItems.map((item: OrderbookItemData, index) => (
          <OrderBookItem key={`${item.orderPrice}-${index}`} item={item} isSell={false} maxVolume={maxVolume} />
        ))
      ) : (
        <div className="text-center text-gray-400 text-[10px] py-4">매수 호가 데이터가 없습니다</div>
      )}
    </div>
  );
}
