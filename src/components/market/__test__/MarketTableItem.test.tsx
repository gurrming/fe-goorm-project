import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import render from '../../../lib/test/render';
import useCategoryIdStore from '../../../store/useCategoryId';
import { useTickerStore } from '../../../store/websocket/useTickerStore';
import MarketTableItem from '../MarketTableItem';
import type { TAssets } from '../../../types/asset';

/**
 * RTL Integration: MarketTableItem 보유 탭 렌더링 검증
 * 서버에서 받은 portfolioAsset 데이터가 올바르게 표시되는지 검증
 */
describe('MarketTableItem 보유 탭 렌더링', () => {
  beforeEach(() => {
    useCategoryIdStore.setState({ categoryId: 1 });
    useTickerStore.setState({ tickerByCategoryId: {} });
  });

  const mockPortfolioAsset: TAssets = {
    categoryId: 1,
    categoryName: '비트코인',
    symbol: 'BTC',
    avgPrice: 50000,
    investCount: 10,
    currentPrice: 55000,
    buyAmount: 500000,
    evaluationAmount: 550000,
    evaluationProfit: 50000,
    profitRate: 10.0,
  };

  it('보유 탭에서 portfolioAsset 데이터가 올바르게 렌더링된다', async () => {
    // Arrange
    const portfolioAsset = mockPortfolioAsset;

    // Act
    await render(
      <MarketTableItem
        activeTab="holding"
        portfolioAsset={portfolioAsset}
        isFavorite={false}
        onToggleFavorite={vi.fn()}
      />,
    );

    // Assert
    // 종목 심볼 표시 확인
    expect(screen.getByText('BTC')).toBeInTheDocument();

    // 보유 수량 표시 확인
    expect(screen.getByText('10')).toBeInTheDocument();

    // 평가 금액 표시 확인
    expect(screen.getByText(/550,000/)).toBeInTheDocument();

    // 매수 평균 가격 표시 확인
    expect(screen.getByText(/50,000/)).toBeInTheDocument();

    // % 표시 확인
    expect(screen.getByText('+10.00%')).toBeInTheDocument();

    // 수익금 표시 확인
    expect(screen.getByText(/50,000/)).toBeInTheDocument();
  });

  it('수익률이 양수일 때 +가 붙는다', async () => {
    // Arrange
    const portfolioAsset: TAssets = {
      ...mockPortfolioAsset,
      profitRate: 5.5,
      evaluationProfit: 27500,
    };

    // Act
    await render(
      <MarketTableItem
        activeTab="holding"
        portfolioAsset={portfolioAsset}
        isFavorite={false}
        onToggleFavorite={vi.fn()}
      />,
    );

    // Assert
    expect(screen.getByText('+5.50%')).toBeInTheDocument();
  });

  it('수익률이 음수일 때 - 접두사가 표시된다', async () => {
    // Arrange
    const portfolioAsset: TAssets = {
      ...mockPortfolioAsset,
      profitRate: -5.5,
      evaluationProfit: -27500,
    };

    // Act
    await render(
      <MarketTableItem
        activeTab="holding"
        portfolioAsset={portfolioAsset}
        isFavorite={false}
        onToggleFavorite={vi.fn()}
      />,
    );

    // Assert
    expect(screen.getByText('-5.50%')).toBeInTheDocument();
  });

  it('수익률이 0일 때 접두사 없이 표시된다', async () => {
    // Arrange
    const portfolioAsset: TAssets = {
      ...mockPortfolioAsset,
      profitRate: 0,
      evaluationProfit: 0,
    };

    // Act
    await render(
      <MarketTableItem
        activeTab="holding"
        portfolioAsset={portfolioAsset}
        isFavorite={false}
        onToggleFavorite={vi.fn()}
      />,
    );

    // Assert
    expect(screen.getByText('0.00%')).toBeInTheDocument();
  });

  it('행 클릭 시 setCategoryId가 호출된다', async () => {
    // Arrange
    const portfolioAsset = mockPortfolioAsset;
    // 초기 categoryId를 다른 값으로 설정
    useCategoryIdStore.setState({ categoryId: 999 });
    const { user } = await render(
      <MarketTableItem
        activeTab="holding"
        portfolioAsset={portfolioAsset}
        isFavorite={false}
        onToggleFavorite={vi.fn()}
      />,
    );

    // Act
    // BTC 텍스트를 클릭하면 부모 div의 onClick이 트리거됨
    const btcElement = screen.getByText('BTC');
    await user.click(btcElement);

    // Assert
    // setCategoryId가 호출되어 categoryId가 변경되었는지 확인
    expect(useCategoryIdStore.getState().categoryId).toBe(1);
  });
});
