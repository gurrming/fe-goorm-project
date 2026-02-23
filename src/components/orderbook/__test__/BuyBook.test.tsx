import { screen, act } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, it, beforeEach, expect } from 'vitest';
import BuyBook from '../BuyBook';
import { mockUseCategoryIdStore } from '@/lib/test/mockZustandStore';
import render from '@/lib/test/render';
import { testServer } from '@/mocks/testServer';
import useCategoryIdStore from '@/store/useCategoryId';
import { useOrderbookStore } from '@/store/websocket/useOrderbookStore';

describe('BuyBook', () => {
  const initialCategoryState = useCategoryIdStore.getState();
  const initialOrderbookState = useOrderbookStore.getState();

  beforeEach(() => {
    window.localStorage.clear();
    useCategoryIdStore.setState(initialCategoryState, true);
    useOrderbookStore.setState(initialOrderbookState, true);
    
    // OrderBookItem이 useGetCategoryInfo를 호출하므로 핸들러 추가
    testServer.use(
      http.get('*/api/category', () =>
        HttpResponse.json({
          categoryId: 1,
          categoryName: '비트코인',
          symbol: 'BTC',
          tradePrice: 100000,
          changeRate: 0,
          changeAmount: 0,
          openPrice: 95000,
          dailyHigh: 0,
          dailyLow: 0,
          accVolume: 0,
          accAmount: 0,
        }),
      ),
    );
  });

  it('A-4: 호가 데이터 없음 (매수)', async () => {
    // Arrange: categoryId 설정 + 매수 데이터 비어있음
    mockUseCategoryIdStore({ categoryId: 1 });
    useOrderbookStore.setState({
      orderbookData: {
        1: {
          categoryId: 1,
          buySide: [],
          sellSide: [],
        },
      },
    });

    // Act: 호가창(매수 영역) 렌더링
    await render(<BuyBook />);

    // Assert: 빈 상태 메시지 표시
    expect(await screen.findByText('매수 호가 데이터가 없습니다')).toBeInTheDocument();
  });

  /**
   * A-22: 잔량이 0인 호가 처리 확인
   * Level: RTL Integration
   * Goal: 잔량이 0인 호가는 필터링되어 표시되지 않는다.
   */
  it('A-22: 잔량이 0인 호가 처리 확인', async () => {
    // Arrange: categoryId 설정 + 매수 데이터는 있지만 잔량이 0
    mockUseCategoryIdStore({ categoryId: 1 });
    useOrderbookStore.setState({
      orderbookData: {
        1: {
          categoryId: 1,
          buySide: [
            { orderPrice: 100000, totalRemainingCount: 0 },
            { orderPrice: 99000, totalRemainingCount: 0 },
          ],
          sellSide: [],
        },
      },
    });

    // Act: 호가창(매수 영역) 렌더링
    await render(<BuyBook />);

    // Assert: 잔량이 0인 호가는 즉시 리스트에서 제거됨 (빈 상태 메시지 표시)
    expect(await screen.findByText('매수 호가 데이터가 없습니다')).toBeInTheDocument();
  });

  it('A-11: 호가 실시간 업데이트', async () => {
    // Arrange: categoryId 설정 + 특정 가격 P의 잔량이 Q로 렌더된 상태
    mockUseCategoryIdStore({ categoryId: 1 });
    useOrderbookStore.setState({
      orderbookData: {
        1: {
          categoryId: 1,
          buySide: [
            { orderPrice: 100000, totalRemainingCount: 10 },
            { orderPrice: 99000, totalRemainingCount: 5 },
          ],
          sellSide: [],
        },
      },
    });

    await render(<BuyBook />);

    // Assert: 초기 잔량 표시
    expect(await screen.findByText('10')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();

    // Act: P의 잔량이 Q2로 바뀐 데이터 이벤트를 주입 (store setState로 시뮬레이션)
    await act(async () => {
      useOrderbookStore.setState({
        orderbookData: {
          1: {
            categoryId: 1,
            buySide: [
              { orderPrice: 100000, totalRemainingCount: 20 }, // 잔량 변경: 10 → 20
              { orderPrice: 99000, totalRemainingCount: 5 },
            ],
            sellSide: [],
          },
        },
      });
    });

    // Assert: P 행의 잔량 출력이 Q2로 갱신됨
    expect(await screen.findByText('20')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });
});
