import AskBook from './AskBook';
import BidBook from './BidBook';
import MarketSummaryPanel from './MarketSummaryPanel';
import OrderBookGridLayout from './OrderBookGridLayout';
import OrderbookHeader from './OrderbookHeader';
import TradeTapeSection from './TradeTapeSection';

export default function OrderBookPanel() {
  return (
    <div className="w-[495px] h-[800px] bg-white">
      <OrderbookHeader />
      <OrderBookGridLayout>
        <AskBook />
        <MarketSummaryPanel />
        <TradeTapeSection />
        <BidBook />
      </OrderBookGridLayout>
    </div>
  );
}
