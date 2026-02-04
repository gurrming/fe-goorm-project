import { useRef, useLayoutEffect } from 'react';
import BuyBook from './BuyBook';
import MarketSummaryPanel from './MarketSummaryPanel';
import OrderBookGridLayout from './OrderBookGridLayout';
import OrderBookSkeleton from './OrderBookSkeleton';
import SellBook from './SellBook';
import TradeTapeSection from './TradeTapeSection';
import { useOrderbookId } from '../../hooks/websocket/useOrderbookId';
import { useOrderbookLastPrice } from '../../hooks/websocket/useOrderbookLastPrice';
import { useTrades } from '../../hooks/websocket/useTrades';
import { useOrderbookStore } from '../../store/websocket/useOrderbookStore';

type OrderBookContentProps = {
  categoryId: number;
};

export default function OrderBookContent({ categoryId }: OrderBookContentProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const orderbookData = useOrderbookStore((state) => state.orderbookData[categoryId]);
  const isLoading = !orderbookData;

  useOrderbookId(categoryId);
  useOrderbookLastPrice(categoryId);
  useTrades();

  useLayoutEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    requestAnimationFrame(() => {
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;
      if (scrollHeight > clientHeight) {
        const centerScroll = (scrollHeight - clientHeight) / 2;
        container.scrollTop = centerScroll;
      }
    });
  }, [orderbookData, categoryId]);

  return (
    <div ref={scrollContainerRef} className="flex-1 overflow-y-auto min-h-0">
      {isLoading ? (
        <OrderBookSkeleton />
      ) : (
        <OrderBookGridLayout>
          <SellBook />
          <MarketSummaryPanel />
          <TradeTapeSection />
          <BuyBook />
        </OrderBookGridLayout>
      )}
    </div>
  );
}
