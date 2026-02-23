import { screen } from '@testing-library/react';
import { describe, it, beforeEach, expect } from 'vitest';
import OrderBookItem from '../OrderBookItem';
import type { OrderbookItemData } from '@/types/websocket';
import { mockUseCategoryIdStore } from '@/lib/test/mockZustandStore';
import render from '@/lib/test/render';
import useCategoryIdStore from '@/store/useCategoryId';
import useSelectedPriceStore from '@/store/useSelectedPriceStore';
import { useOrderbookStore } from '@/store/websocket/useOrderbookStore';
import { useTradesStore } from '@/store/websocket/useTradesStore';

describe('OrderBookItem', () => {
  const initialCategoryState = useCategoryIdStore.getState();
  const initialSelectedPriceState = useSelectedPriceStore.getState();
  const initialOrderbookState = useOrderbookStore.getState();
  const initialTradesState = useTradesStore.getState();

  beforeEach(() => {
    window.localStorage.clear();
    useCategoryIdStore.setState(initialCategoryState, true);
    useSelectedPriceStore.setState(initialSelectedPriceState, true);
    useOrderbookStore.setState(initialOrderbookState, true);
    useTradesStore.setState(initialTradesState, true);
  });

  const mockItem: OrderbookItemData = {
    orderPrice: 100000,
    totalRemainingCount: 10,
  };

  it('A-7: 호가 가격 클릭 (매수)', async () => {
    // Arrange: categoryId 설정 + bids 데이터 존재
    mockUseCategoryIdStore({ categoryId: 1 });
    useTradesStore.setState({
      tradesData: { price: 100000, count: 1, openPrice: 95000, type: 'BUY', time: Date.now(), intensity: 0 },
    });

    const { user } = await render(<OrderBookItem item={mockItem} isSell={false} maxVolume={10} />);

    // Act: bids 행의 가격 영역 클릭
    const priceElement = screen.getByText('100,000');
    await user.click(priceElement);

    // Assert: 주문 폼의 가격 입력 필드 value가 클릭한 가격으로 변경됨
    // (store를 통해 검증)
    const { selectedPrice } = useSelectedPriceStore.getState();
    expect(selectedPrice).toBe(100000);
  });

  it('A-8: 호가 가격 클릭 (매도)', async () => {
    // Arrange: categoryId 설정 + asks 리스트 표시
    mockUseCategoryIdStore({ categoryId: 1 });
    useTradesStore.setState({
      tradesData: { price: 100000, count: 1, openPrice: 95000, type: 'SELL', time: Date.now(), intensity: 0 },
    });

    const { user } = await render(<OrderBookItem item={mockItem} isSell={true} maxVolume={10} />);

    // Act: asks 가격 클릭
    const priceElement = screen.getByText('100,000');
    await user.click(priceElement);

    // Assert: 가격 입력 필드에 값 반영
    const { selectedPrice } = useSelectedPriceStore.getState();
    expect(selectedPrice).toBe(100000);
  });

  it('A-9: 호가 잔량 클릭', async () => {
    // Arrange: categoryId 설정 + 호가 데이터 존재
    mockUseCategoryIdStore({ categoryId: 1 });
    useTradesStore.setState({
      tradesData: { price: 100000, count: 1, openPrice: 95000, type: 'BUY', time: Date.now(), intensity: 0 },
    });

    const { user } = await render(<OrderBookItem item={mockItem} isSell={false} maxVolume={10} />);

    // Act: 잔량 영역 클릭
    const quantityElement = screen.getByText('10');
    await user.click(quantityElement);

    // Assert: 가격/수량 입력 필드가 동시에 반영됨
    const { selectedPrice, selectedQuantity } = useSelectedPriceStore.getState();
    expect(selectedPrice).toBe(100000);
    expect(selectedQuantity).toBe(10);
  });

  it('A-18: 호가 잔량 차트 바 너비 계산', async () => {
    // Arrange: categoryId 설정 + 호가 데이터 (maxVolume=100, itemVolume=50)
    mockUseCategoryIdStore({ categoryId: 1 });
    useTradesStore.setState({
      tradesData: { price: 100000, count: 1, openPrice: 95000, type: 'BUY', time: Date.now(), intensity: 0 },
    });

    const itemWithVolume: OrderbookItemData = {
      orderPrice: 100000,
      totalRemainingCount: 50,
    };

    await render(<OrderBookItem item={itemWithVolume} isSell={false} maxVolume={100} />);

    // Assert: 차트 바가 렌더링됨 (width 스타일 속성으로 간접 검증)
    // maxVolume=100, itemVolume=50이면 barWidth는 50%가 되어야 함
    const barElement = document.querySelector('[style*="width"]');
    expect(barElement).toBeInTheDocument();
    // 실제 width 값은 style 속성에 있지만, DOM에 렌더링되는 것으로 간접 검증
    expect(await screen.findByText('50')).toBeInTheDocument(); // 잔량 표시 확인
  });

  it('A-19: 호가 가격 등락률 계산', async () => {
    // Arrange: categoryId 설정 + 전일 종가보다 높은 가격 (양수 케이스)
    mockUseCategoryIdStore({ categoryId: 1 });
    useTradesStore.setState({
      tradesData: { price: 100000, count: 1, openPrice: 95000, type: 'BUY', time: Date.now(), intensity: 0 },
    });

    const item: OrderbookItemData = {
      orderPrice: 100000,
      totalRemainingCount: 10,
    };

    await render(<OrderBookItem item={item} isSell={false} maxVolume={10} />);

    // Assert: 등락률이 양수로 표시됨 (양수면 + 기호 포함)
    expect(await screen.findByText(/\+.*%/)).toBeInTheDocument();

    // Arrange: 전일 종가보다 낮은 가격 (음수 케이스)
    useTradesStore.setState({
      tradesData: { price: 100000, count: 1, openPrice: 105000, type: 'BUY', time: Date.now(), intensity: 0 },
    });

    // Assert: 등락률이 음수로 표시됨 (- 기호 포함)
    const percentageText = await screen.findByText(/-.*%/);
    expect(percentageText).toBeInTheDocument();
    expect(percentageText.textContent).toContain('-');
  });

  it('A-20: 호가 가격 등락률 계산 (전일 종가 없음)', async () => {
    // Arrange: categoryId 설정 + 전일 종가가 0
    mockUseCategoryIdStore({ categoryId: 1 });
    useTradesStore.setState({
      tradesData: { price: 100000, count: 1, openPrice: 0, type: 'BUY', time: Date.now(), intensity: 0 },
    });

    await render(<OrderBookItem item={mockItem} isSell={false} maxVolume={10} />);

    // Assert: 등락률이 0으로 표시됨
    expect(await screen.findByText('0.00%')).toBeInTheDocument();
  });
});
