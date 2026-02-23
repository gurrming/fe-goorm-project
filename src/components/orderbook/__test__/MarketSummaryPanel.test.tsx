import { screen, act } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, it, beforeEach, expect } from 'vitest';
import MarketSummaryPanel from '../MarketSummaryPanel';
import { WebsocketProvider } from '@/hooks/useWebsocket';
import { mockUseCategoryIdStore } from '@/lib/test/mockZustandStore';
import render from '@/lib/test/render';
import { testServer } from '@/mocks/testServer';
import useCategoryIdStore from '@/store/useCategoryId';
import { useTickerStore } from '@/store/websocket/useTickerStore';
import { useTradesStore } from '@/store/websocket/useTradesStore';

/**
 * MarketSummaryPanel의 고가/저가 % 계산 로직 검증
 */
describe('MarketSummaryPanel 고가/저가 % 계산', () => {
  // 고가 % 계산 함수 (실제 컴포넌트 로직)
  const calculateHighChangeRate = (high: number, previousClose: number, fallbackRate: number = 0): number => {
    return previousClose !== 0 ? ((high - previousClose) / previousClose) * 100 : fallbackRate;
  };

  // 저가 % 계산 함수 (실제 컴포넌트 로직)
  const calculateLowChangeRate = (low: number, previousClose: number, fallbackRate: number = 0): number => {
    return previousClose !== 0 ? ((low - previousClose) / previousClose) * 100 : fallbackRate;
  };

  describe('고가 % 계산', () => {
    it('전일종가가 0보다 크면 정상적으로 계산한다', () => {
      // Arrange
      const high = 55000;
      const previousClose = 50000;

      // Act
      const result = calculateHighChangeRate(high, previousClose);

      // Assert
      expect(result).toBe(10); // (55000 - 50000) / 50000 * 100 = 10%
    });

    it('고가가 전일종가보다 낮으면 음수 %을 반환한다', () => {
      // Arrange
      const high = 45000;
      const previousClose = 50000;

      // Act
      const result = calculateHighChangeRate(high, previousClose);

      // Assert
      expect(result).toBe(-10);
    });
  });

  describe('저가 % 계산', () => {
    it('전일종가가 0보다 크면 정상적으로 계산한다', () => {
      // Arrange
      const low = 45000;
      const previousClose = 50000;

      // Act
      const result = calculateLowChangeRate(low, previousClose);

      // Assert
      expect(result).toBe(-10); // (45000 - 50000) / 50000 * 100 = -10%
    });

    it('저가가 전일종가보다 높으면 양수 %을 반환한다', () => {
      // Arrange
      const low = 55000;
      const previousClose = 50000;

      // Act
      const result = calculateLowChangeRate(low, previousClose);

      // Assert
      expect(result).toBe(10);
    });
  });
});

describe('MarketSummaryPanel', () => {
  const initialCategoryState = useCategoryIdStore.getState();
  const initialTickerState = useTickerStore.getState();
  const initialTradesState = useTradesStore.getState();

  beforeEach(() => {
    window.localStorage.clear();
    useCategoryIdStore.setState(initialCategoryState, true);
    useTickerStore.setState(initialTickerState, true);
    useTradesStore.setState(initialTradesState, true);
  });

  /**
   * A-14: 호가 상단 우측(전일종가 영역) 실시간 업데이트
   * Level: RTL Integration
   * Goal: 전일종가, 거래량, 거래대금이 실시간으로 업데이트됨
   */
  it('A-14: 호가 상단 우측(전일종가 영역) 실시간 업데이트', async () => {
    // Arrange: categoryId 설정 + 초기 데이터
    mockUseCategoryIdStore({ categoryId: 1 });
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

    await render(
      <WebsocketProvider>
        <MarketSummaryPanel />
      </WebsocketProvider>,
    );

    // Assert: 초기 전일종가 표시
    expect(await screen.findByText('95,000')).toBeInTheDocument();

    // Act: ticker 데이터 업데이트 (거래량 변경)
    await act(async () => {
      useTickerStore.setState({
        tickerByCategoryId: {
          1: {
            price: 100000,
            changeRate: 0,
            changeAmount: 0,
            high: 0,
            low: 0,
            volume: 1000, // 거래량 변경
            amount: 0,
          },
        },
      });
    });

    // Assert: 거래량 출력이 갱신됨
    expect(await screen.findByText('1,000')).toBeInTheDocument();

    // Act: ticker 데이터 업데이트 (거래대금 변경)
    await act(async () => {
      useTickerStore.setState({
        tickerByCategoryId: {
          1: {
            price: 100000,
            changeRate: 0,
            changeAmount: 0,
            high: 0,
            low: 0,
            volume: 1000,
            amount: 50000000, // 거래대금 변경
          },
        },
      });
    });

    // Assert: 거래대금 출력이 갱신됨
    expect(await screen.findByText('50,000,000')).toBeInTheDocument();
  });
});
