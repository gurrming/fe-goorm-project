import { memo, useMemo } from 'react';
import OrderBookItem from './OrderBookItem';
import type { OrderbookItemData } from '../../types/websocket';

type OrderBookSideProps = {
  items: OrderbookItemData[];
  flashPrice: number | null;
  openPrice: number;
  isSell: boolean;
  emptyMessage: string;
};

function OrderBookSide({ items, flashPrice, openPrice, isSell, emptyMessage }: OrderBookSideProps) {
  const filteredItems = useMemo(() => items.filter((item) => Number(item.totalRemainingCount) > 0), [items]);

  const maxVolume = useMemo(() => {
    if (filteredItems.length === 0) {
      return 0;
    }
    return Math.max(0, ...filteredItems.map((item) => Number(item.totalRemainingCount)));
  }, [filteredItems]);

  return (
    <div className={`col-span-2 flex ${isSell ? 'flex-col-reverse' : 'flex-col'}`}>
      {filteredItems.length > 0 ? (
        filteredItems.map((item, index) => (
          <OrderBookItem
            key={`${item.orderPrice}-${index}`}
            item={item}
            isSell={isSell}
            maxVolume={maxVolume}
            flashPrice={flashPrice}
            openPrice={openPrice}
          />
        ))
      ) : (
        <div className="text-center text-gray-400 text-[10px] py-4">{emptyMessage}</div>
      )}
    </div>
  );
}

export default memo(OrderBookSide);
