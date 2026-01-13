import { useRef, useLayoutEffect } from 'react';
import AskBook from './AskBook';
import BidBook from './BidBook';
import MarketSummaryPanel from './MarketSummaryPanel';
import OrderBookGridLayout from './OrderBookGridLayout';
import OrderbookHeader from './OrderbookHeader';
import TradeTapeSection from './TradeTapeSection';
import { useOrderbookId } from '../../hooks/websocket/useOrderbookId';
import { useOrderbookLastPrice } from '../../hooks/websocket/useOrderbookLastPrice';
import { useTrades } from '../../hooks/websocket/useTrades';
import useCategoryIdStore from '../../store/useCategoryId';
import { useOrderbookStore } from '../../store/websocket/useOrderbookStore';

export default function OrderBookPanel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const categoryId = useCategoryIdStore((state) => state.categoryId);
  const orderbookData = useOrderbookStore((state) => state.orderbookData[categoryId]);

  // WebSocket 구독 훅 (orderbook/trades)
  // 매수 / 매도 좌 우측 테이블
  useOrderbookId(categoryId);
  useOrderbookLastPrice(categoryId);
  useTrades();

  useLayoutEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) {
      return;
    }

    // DOM이 완전히 렌더링된 후 스크롤 위치를 계산하기 위해 requestAnimationFrame 사용
    // 이렇게 하면 자식 컴포넌트들이 모두 렌더링된 후 정확한 scrollHeight를 얻을 수 있음
    requestAnimationFrame(() => {
      // 요소의 전체 길이
      const scrollHeight = container.scrollHeight;
      // 요소의 뷰포트 길이
      const clientHeight = container.clientHeight;

      // 스크롤 가능한 경우에만 중앙으로 이동
      if (scrollHeight > clientHeight) {
        // 요소 내부에서 scrollHeight - clientHeight는 사용자가 스크롤할 수 있는 전체 거리
        // centerScroll는 스크롤 가능한 거리의 중앙 지점
        const centerScroll = (scrollHeight - clientHeight) / 2;
        container.scrollTop = centerScroll;
      }
    });
  }, [orderbookData, categoryId]);

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
