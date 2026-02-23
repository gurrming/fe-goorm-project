import { screen, act } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, it, beforeEach, expect } from 'vitest';
import SellBook from '../SellBook';
import { mockUseCategoryIdStore } from '@/lib/test/mockZustandStore';
import render from '@/lib/test/render';
import { testServer } from '@/mocks/testServer';
import useCategoryIdStore from '@/store/useCategoryId';
import { useOrderbookStore } from '@/store/websocket/useOrderbookStore';

describe('SellBook', () => {
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

  it('A-5: 호가 데이터 없음 (매도)', async () => {
    // Arrange: categoryId 설정 + 매도 데이터 비어있음
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

    // Act: 호가창(매도 영역) 렌더링
    await render(<SellBook />);

    // Assert: 빈 상태 메시지 표시
    expect(await screen.findByText('매도 호가 데이터가 없습니다')).toBeInTheDocument();
  });

  it('A-22: 잔량이 0인 호가 처리 확인', async () => {
    // Arrange: categoryId 설정 + 매도 데이터는 있지만 잔량이 0
    mockUseCategoryIdStore({ categoryId: 1 });
    useOrderbookStore.setState({
      orderbookData: {
        1: {
          categoryId: 1,
          buySide: [],
          sellSide: [
            { orderPrice: 101000, totalRemainingCount: 0 },
            { orderPrice: 102000, totalRemainingCount: 0 },
          ],
        },
      },
    });

    // Act: 호가창(매도 영역) 렌더링
    await render(<SellBook />);

    // Assert: 잔량이 0인 호가는 즉시 리스트에서 제거됨 (빈 상태 메시지 표시)
    expect(await screen.findByText('매도 호가 데이터가 없습니다')).toBeInTheDocument();
  });

  it('A-11: 호가 실시간 업데이트', async () => {
    // Arrange: categoryId 설정 + 특정 가격 P의 잔량이 Q로 렌더된 상태
    mockUseCategoryIdStore({ categoryId: 1 });
    useOrderbookStore.setState({
      orderbookData: {
        1: {
          categoryId: 1,
          buySide: [],
          sellSide: [
            { orderPrice: 101000, totalRemainingCount: 10 },
            { orderPrice: 102000, totalRemainingCount: 5 },
          ],
        },
      },
    });

    await render(<SellBook />);

    // Assert: 초기 잔량 표시
    expect(await screen.findByText('10')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();

    await act(async () => {
      useOrderbookStore.setState({
        orderbookData: {
          1: {
            categoryId: 1,
            buySide: [],
            sellSide: [
              { orderPrice: 101000, totalRemainingCount: 25 },
              { orderPrice: 102000, totalRemainingCount: 5 },
            ],
          },
        },
      });
    });

    expect(await screen.findByText('25')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });
});
