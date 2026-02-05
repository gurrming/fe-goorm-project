import type { OrderbookItemData } from '@/types/websocket';
import OrderBookSide from '@/components/orderbook/OrderBookSide';

type SellBookProps = {
  items: OrderbookItemData[];
  flashPrice: number | null;
  openPrice: number;
};

export default function SellBook({ items, flashPrice, openPrice }: SellBookProps) {
  return (
    <OrderBookSide
      data-testid="sell-book"
      items={items}
      flashPrice={flashPrice}
      openPrice={openPrice}
      isSell={true}
      emptyMessage="매도 호가 데이터가 없습니다"
    />
  );
}
