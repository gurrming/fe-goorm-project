import { screen, waitFor } from '@testing-library/react';
import { Mock, vi } from 'vitest';
import Transaction from '../transaction/Transaction';
import { useGetInfiniteSettled } from '@/hooks/infinite/useGetInfiniteSettled';
import { useGetInfiniteUnSettled } from '@/hooks/infinite/useGetInfiniteUnSettled';
import { mockUseUserStore } from '@/lib/test/mockZustandStore';
import render from '@/lib/test/render';

vi.mock('@/hooks/infinite/useGetInfiniteSettled', () => ({
  useGetInfiniteSettled: vi.fn(),
}));
vi.mock('@/hooks/infinite/useGetInfiniteUnSettled', () => ({
  useGetInfiniteUnSettled: vi.fn(),
}));

describe('<Transaction /> 통합 테스트', () => {
  beforeEach(() => {
    (useGetInfiniteSettled as Mock).mockReturnValue({
      data: { pages: [] }, // Settled는 pages.flat()을 사용하므로 빈 배열
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isFetching: false,
    });

    (useGetInfiniteUnSettled as Mock).mockReturnValue({
      data: { pages: [] },
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isFetching: false,
    });
  });

  describe('로그인 여부에 따른 거래내역 표시 테스트', () => {
    beforeEach(() => {
      mockUseUserStore({ user: { id: 1, nickname: 'test' } });
    });
    it('TL-01: 로그인된 상태에서 체결 내역 조회', async () => {
      (useGetInfiniteSettled as Mock).mockReturnValue({
        data: {
          pages: [
            [
              {
                tradeId: 1422,
                tradePrice: 4000,
                tradeCount: 3,
                tradeTime: '2024-01-01T12:00:00',
                symbol: 'SOL',
                myOrderType: 'SELL',
                buyOrderId: 1953,
                sellOrderId: 1952,
                takerType: 'BUY',
                tradeClosePrice: 0,
              },
            ],
          ],
        },
        fetchNextPage: vi.fn(),
        hasNextPage: false,
      });
      await render(<Transaction />);
      expect(screen.getByLabelText('체결')).toBeInTheDocument();

      expect(screen.getByText('SOL')).toBeInTheDocument();
      expect(screen.getByText('매도')).toBeInTheDocument();
      expect(screen.getByText('4,000')).toBeInTheDocument();
    });
    it('TL-02: 로그인된 상태에서 미체결 내역 조회', async () => {
      (useGetInfiniteUnSettled as Mock).mockReturnValue({
        data: {
          pages: [
            {
              totalOpenOrderCount: 1,
              orders: {
                content: [
                  {
                    orderId: 100,
                    categoryId: 1,
                    symbol: 'BTC',
                    categoryName: '비트코인',
                    orderType: 'SELL',
                    orderPrice: 50000000,
                    orderCount: 1,
                    remainingCount: 0.5,
                    executedCount: 0.5,
                    totalAmount: 50000000,
                    orderTime: '2024-01-01T12:00:00',
                    orderStatus: 'WAIT',
                  },
                ],
              },
            },
          ],
        },
        fetchNextPage: vi.fn(),
        hasNextPage: false,
      });
      const { user } = await render(<Transaction />);
      const unsettledTab = screen.getByLabelText('미체결');
      await user.click(unsettledTab);

      expect(screen.getByText('BTC')).toBeInTheDocument();
      expect(screen.getByText('매도')).toBeInTheDocument(); // orderType: SELL

      expect(screen.getByText(/50,000,000/)).toBeInTheDocument();

      expect(screen.getAllByText(/1\.00/).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/0\.50/).length).toBeGreaterThan(0);
    });
    it('TL-03: 로그인되지 않은 상태에서 거래내역 조회', async () => {
      mockUseUserStore({ user: null });
      await render(<Transaction />);
      expect(screen.getByText('로그인 후 확인할 수 있습니다.')).toBeInTheDocument();
    });
  });
  describe('탭 전환 테스트', () => {
    beforeEach(() => {
      mockUseUserStore({ user: { id: 1, nickname: 'test' } });
    });
    it('TL-09: 체결과 미체결 탭 전환', async () => {
      (useGetInfiniteSettled as Mock).mockReturnValue({
        data: {
          pages: [
            [
              {
                tradeId: 1,
                tradePrice: 100,
                tradeCount: 1,
                tradeTime: '2024-01-01T00:00:00',
                symbol: 'SETTLED',
                myOrderType: 'BUY',
                buyOrderId: 0,
                sellOrderId: 0,
                takerType: 'SELL',
                tradeClosePrice: 0,
              },
            ],
          ],
        },
        fetchNextPage: vi.fn(),
        hasNextPage: false,
      });

      (useGetInfiniteUnSettled as Mock).mockReturnValue({
        data: {
          pages: [
            {
              totalOpenOrderCount: 1,
              orders: {
                content: [
                  {
                    orderId: 2,
                    orderPrice: 200,
                    orderCount: 1,
                    remainingCount: 1,
                    orderTime: '2024-01-01T00:00:00',
                    symbol: 'UNSETTLED',
                    orderType: 'SELL',
                    categoryId: 0,
                    categoryName: '',
                    orderStatus: '',
                    executedCount: 0,
                    totalAmount: 0,
                  },
                ],
              },
            },
          ],
        },
        fetchNextPage: vi.fn(),
        hasNextPage: false,
      });

      const { user } = await render(<Transaction />);

      expect(screen.getByText('100')).toBeInTheDocument();
      expect(screen.queryByText('200')).not.toBeInTheDocument();

      await user.click(screen.getByLabelText('미체결'));

      await waitFor(() => {
        expect(screen.queryByText('100')).not.toBeInTheDocument();
        expect(screen.getByText('200')).toBeInTheDocument();
      });
    });
  });
});
