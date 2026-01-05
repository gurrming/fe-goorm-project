import { useRef, useLayoutEffect } from 'react';
import AskBook from './AskBook';
import BidBook from './BidBook';
import MarketSummaryPanel from './MarketSummaryPanel';
import OrderBookGridLayout from './OrderBookGridLayout';
import OrderbookHeader from './OrderbookHeader';
import TradeTapeSection from './TradeTapeSection';

export default function OrderBookPanel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // 호가창의 viewport 기준으로 정확히 가운데에 스크롤 위치를 조정하도록 함.
    const container = scrollContainerRef.current;
    if (!container) {
      return;
    }

    // 요소의 전체 길이
    const scrollHeight = container.scrollHeight;
    // 요소의 뷰포트 길이
    const clientHeight = container.clientHeight;
    // 요소 내부에서 scrollHeight - clientHeight는 사용자가 스크롤할 수 있는 전체 거리
    // centerScroll는 스크롤 가능한 거리의 중앙 지점
    const centerScroll = (scrollHeight - clientHeight) / 2;
    container.scrollTop = centerScroll;
  }, []);

  // 전체 길이에서 내가 보고있는 길이 빼면 (전체 길이 - 내가 보고 있는 길이) = 스크롤 가능한 거리
  // 스크롤 가능한 거리의 중앙 지점을 찾아서 scrollTop을 설정
  // scrollTop은 내 기준 뷰포트에서 가장 위 y좌표
  // 컨텐츠의 중앙(scrollHeight/2)이 화면의 중앙(scrollTop + clientHeight/2)에 오도록 scrollTop을 계산해서 설정
  // container.scrollTop = centerScroll;

  return (
    <div className="w-[495px] h-[800px] flex flex-col bg-white">
      <OrderbookHeader />
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto min-h-0">
        <OrderBookGridLayout>
          <BidBook />
          <MarketSummaryPanel />
          <TradeTapeSection />
          <AskBook />
        </OrderBookGridLayout>
      </div>
    </div>
  );
}
