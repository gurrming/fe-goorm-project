import { screen, waitFor } from '@testing-library/react';
import { Mock, vi } from 'vitest';
import UnSettled from '../transaction/UnSettled';
import { usePatchCancel } from '@/api/orders/usePatchCancel';
import { usePatchCancelAll } from '@/api/orders/usePatchCancelAll';
import { useGetInfiniteUnSettled } from '@/hooks/infinite/useGetInfiniteUnSettled';
import { mockUseUserStore } from '@/lib/test/mockZustandStore';
import render from '@/lib/test/render';

vi.mock('@/hooks/infinite/useGetInfiniteUnSettled', () => ({
  useGetInfiniteUnSettled: vi.fn(),
}));
vi.mock('@/api/orders/usePatchCancel', () => ({
  usePatchCancel: vi.fn(),
}));
vi.mock('@/api/orders/usePatchCancelAll', () => ({
  usePatchCancelAll: vi.fn(),
}));

describe('<UnSettled /> 통합 테스트', () => {
  beforeEach(() => {
    mockUseUserStore({ user: { id: 1, nickname: 'test' } });
    (useGetInfiniteUnSettled as Mock).mockReturnValue({
      data: { pages: [] },
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isFetching: false,
    });
    (usePatchCancel as Mock).mockReturnValue({ mutate: vi.fn() });
    (usePatchCancelAll as Mock).mockReturnValue({ mutate: vi.fn() });
  });
  describe('미체결 주문 취소 테스트', () => {
    it('TL-04: 미체결 주문 전체 취소', async () => {
      const cancelAllMutate = vi.fn();
      (usePatchCancelAll as Mock).mockReturnValue({
        mutate: cancelAllMutate,
      });
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
                  {
                    orderId: 101,
                    categoryId: 1,
                    symbol: 'ETH',
                    categoryName: '이더리움',
                    orderType: 'BUY',
                    orderPrice: 10000000,
                    orderCount: 1,
                    remainingCount: 0.5,
                    executedCount: 0.5,
                    totalAmount: 10000000,
                    orderTime: '2024-01-01T13:00:00',
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
      const { user } = await render(<UnSettled />);
      const cancelAllButton = screen.getByText('전체 취소');

      await user.click(cancelAllButton);
      await waitFor(() => {
        expect(cancelAllMutate).toHaveBeenCalledTimes(1);
      });
    });
    it('TL-05: 미체결 주문 개별 취소', async () => {
      const cancelMutate = vi.fn();
      (usePatchCancel as Mock).mockReturnValue({
        mutate: cancelMutate,
      });
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
      const { user } = await render(<UnSettled />);
      const cancelButton = screen.getByRole('button', { name: '주문취소' });

      await user.click(cancelButton);
      await waitFor(() => {
        expect(cancelMutate).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('부분 체결 존재 시 미체결량 확인 테스트', () => {
    it('TL-06: 부분 체결 존재 시 미체결량 확인', () => {});
  });

  describe('내역 없는 경우 테스트', () => {
    it('TL-07: 미체결 내역이 없는 경우 표시', async () => {
      (useGetInfiniteUnSettled as Mock).mockReturnValue({
        data: {
          pages: [
            {
              totalOpenOrderCount: 1,
              orders: {
                content: [],
              },
            },
          ],
        },
        fetchNextPage: vi.fn(),
        hasNextPage: false,
      });
      await render(<UnSettled />);

      expect(screen.getByText('미체결 내역이 없습니다.')).toBeInTheDocument();
    });
  });
});
