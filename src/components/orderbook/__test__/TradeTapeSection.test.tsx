import { screen, act } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, it, beforeEach, expect } from 'vitest';
import TradeTapeSection from '../TradeTapeSection';
import type { TradesData } from '@/types/websocket';
import { mockUseCategoryIdStore } from '@/lib/test/mockZustandStore';
import render from '@/lib/test/render';
import { testServer } from '@/mocks/testServer';
import useCategoryIdStore from '@/store/useCategoryId';
import { useTradesStore } from '@/store/websocket/useTradesStore';

describe('TradeTapeSection', () => {
  const initialCategoryState = useCategoryIdStore.getState();
  const initialTradesState = useTradesStore.getState();

  beforeEach(() => {
    window.localStorage.clear();
    useCategoryIdStore.setState(initialCategoryState, true);
    useTradesStore.setState(initialTradesState, true);
  });

  /**
   * A-16: 체결 내역 빈 데이터
   * Level: RTL Integration
   */
  it('A-16: 호가 좌측 하단 (체결강도) 빈 데이터', async () => {
    // Arrange: categoryId 설정 + 체결 리스트 비어있음
    mockUseCategoryIdStore({ categoryId: 1 });
    useTradesStore.setState({
      tradesList: [],
      tradesData: null,
    });
    testServer.use(
      http.get('*/api/trades', () =>
        HttpResponse.json({
          tradePrice: 0,
          tradeCount: 0,
        }),
      ),
    );

    // Act: 체결 내역 섹션 렌더링
    await render(<TradeTapeSection />);

    // Assert: 빈 상태 메시지 표시
    expect(await screen.findByText('체결 내역이 없습니다')).toBeInTheDocument();
  });

  /**
   * A-17(축소): 체결 이벤트 수신 → 리스트 상단 추가 + 체결강도 갱신
   * Level: RTL Integration
   * Goal: "실시간" 자체가 아니라, 입력 이벤트가 UI에 반영되는 계약만 검증한다.
   */
  it('A-17: 호가 좌측 하단 (체결강도) 실시간 업데이트', async () => {
    // Arrange: categoryId 설정 + 초기 체결 리스트 존재
    mockUseCategoryIdStore({ categoryId: 1 });
    const initialTrade: TradesData = {
      price: 100000,
      count: 1,
      openPrice: 95000,
      type: 'BUY',
      time: Date.now() - 1000,
      intensity: 1.5,
    };
    useTradesStore.setState({
      tradesList: [initialTrade],
      tradesData: initialTrade,
    });
    testServer.use(
      http.get('*/api/trades', () =>
        HttpResponse.json({
          tradePrice: 100000,
          tradeCount: 1,
        }),
      ),
    );

    await render(<TradeTapeSection />);

    // Assert: 초기 체결 내역 표시
    expect(await screen.findByText('100,000')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('+1.50%')).toBeInTheDocument(); // 체결강도

    // Act: 새 trade 이벤트 주입 (store setState로 시뮬레이션)
    const newTrade: TradesData = {
      price: 101000,
      count: 2,
      openPrice: 95000,
      type: 'BUY',
      time: Date.now(),
      intensity: 2.5,
    };
    await act(async () => {
      useTradesStore.getState().addTrade(newTrade);
    });

    // Assert: 리스트 상단에 새로운 체결이 추가됨
    expect(await screen.findByText('101,000')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    // 체결강도 값 출력이 갱신됨
    expect(screen.getByText('+2.50%')).toBeInTheDocument();
  });

  /**
   * A-15: 호가 좌측 하단 (체결강도) 표시
   * Level: RTL Integration
   * Goal: 체결강도 영역이 올바르게 표시된다.
   */
  it('A-15: 호가 좌측 하단 (체결강도) 표시', async () => {
    // Arrange: categoryId 설정 + 체결 리스트 빈 상태
    mockUseCategoryIdStore({ categoryId: 1 });
    useTradesStore.setState({
      tradesList: [],
      tradesData: null,
    });
    testServer.use(
      http.get('*/api/trades', () =>
        HttpResponse.json({
          tradePrice: 0,
          tradeCount: 0,
        }),
      ),
    );

    await render(<TradeTapeSection />);

    // Assert: 초기에는 빈 상태 메시지
    expect(await screen.findByText('체결 내역이 없습니다')).toBeInTheDocument();

    // Act: 새 trade 이벤트 주입
    const newTrade: TradesData = {
      price: 100000,
      count: 1,
      openPrice: 95000,
      type: 'BUY',
      time: Date.now(),
      intensity: 1.0,
    };
    await act(async () => {
      useTradesStore.getState().addTrade(newTrade);
    });

    // Assert: "체결강도" 헤더와 현재 체결강도 값 표시
    expect(await screen.findByText('체결강도')).toBeInTheDocument();
    expect(screen.getByText('+1.00%')).toBeInTheDocument();
    // "체결가", "체결량" 테이블 헤더 표시
    expect(screen.getByText('체결가')).toBeInTheDocument();
    expect(screen.getByText('체결량')).toBeInTheDocument();
    // 체결 내역 리스트 표시
    expect(screen.getByText('100,000')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.queryByText('체결 내역이 없습니다')).not.toBeInTheDocument();
  });
});
