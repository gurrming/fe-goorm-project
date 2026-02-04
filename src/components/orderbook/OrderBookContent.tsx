import { useRef, useLayoutEffect } from 'react';
import BuyBook from './BuyBook';
import MarketSummaryPanel from './MarketSummaryPanel';
import OrderBookGridLayout from './OrderBookGridLayout';
import OrderBookSkeleton from './OrderBookSkeleton';
import SellBook from './SellBook';
import TradeTapeSection from './TradeTapeSection';
import { useGetCategoryInfo } from '@/api/useGetCategoryInfo';
import { useOrderbookId } from '../../hooks/websocket/useOrderbookId';
import { useOrderbookLastPrice } from '../../hooks/websocket/useOrderbookLastPrice';
import { useTrades } from '../../hooks/websocket/useTrades';
import { useOrderbookStore } from '../../store/websocket/useOrderbookStore';

type OrderBookContentProps = {
  categoryId: number;
};

export default function OrderBookContent({ categoryId }: OrderBookContentProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const hasCenteredRef = useRef<number | null>(null);
  const orderbookData = useOrderbookStore((state) => state.orderbookData[categoryId]);
  const lastPrice = useOrderbookStore((state) => state.lastPrice);
  const { data: categoryInfo } = useGetCategoryInfo(categoryId);
  const isLoading = !orderbookData;

  const openPrice = categoryInfo?.openPrice ?? 0;
  const flashPrice = lastPrice?.price ?? categoryInfo?.tradePrice ?? null;
  const buySide = orderbookData?.buySide ?? [];
  const sellSide = orderbookData?.sellSide ?? [];

  useOrderbookId(categoryId);
  useOrderbookLastPrice(categoryId);
  useTrades();

  useLayoutEffect(() => {
    if (!orderbookData) return;
    if (hasCenteredRef.current === categoryId) return;
    const container = scrollContainerRef.current;
    if (!container) return;

    requestAnimationFrame(() => {
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;
      if (scrollHeight > clientHeight) {
        const centerScroll = (scrollHeight - clientHeight) / 2;
        container.scrollTop = centerScroll;
      }
      hasCenteredRef.current = categoryId;
    });
  }, [orderbookData, categoryId]);

  return (
    <div ref={scrollContainerRef} className="flex-1 overflow-y-auto min-h-0">
      {isLoading ? (
        <OrderBookSkeleton />
      ) : (
        <OrderBookGridLayout>
          <SellBook items={sellSide} flashPrice={flashPrice} openPrice={openPrice} />
          <MarketSummaryPanel />
          <TradeTapeSection />
          <BuyBook items={buySide} flashPrice={flashPrice} openPrice={openPrice} />
        </OrderBookGridLayout>
      )}
    </div>
  );
}
