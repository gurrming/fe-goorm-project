import type { OrderbookItemData } from '../../types/websocket';
import OrderBookSide from '@/components/orderbook/OrderBookSide';

type BuyBookProps = {
  items: OrderbookItemData[];
  flashPrice: number | null;
  openPrice: number;
};

export default function BuyBook({ items, flashPrice, openPrice }: BuyBookProps) {
  return (
    <OrderBookSide
      data-testid="buy-book"
      items={items}
      flashPrice={flashPrice}
      openPrice={openPrice}
      isSell={false}
      emptyMessage="매수 호가 데이터가 없습니다"
    />
  );
}
