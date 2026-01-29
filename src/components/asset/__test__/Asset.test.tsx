import { waitFor, screen, act, within } from '@testing-library/react';
import { Mock, vi } from 'vitest';
import { useGetMyAsset } from '../../../api/asset/useGetAsset';
import { usePostOrder } from '../../../api/orders/usePostOrder';
import { useGetInfiniteInvest } from '../../../hooks/infinite/useGetInfiniteInvest';
import { mockUseUserStore, mockUseAssetStore } from '../../../lib/test/mockZustandStore';
import Asset from '../Asset';
import Header from '@/components/layout/Header';
import { useWebsocket } from '@/hooks/useWebsocket';
import render from '@/lib/test/render';

vi.mock('../../../api/asset/useGetAsset', () => ({
  useGetMyAsset: vi.fn(),
}));

vi.mock('../../../hooks/infinite/useGetInfiniteInvest', () => ({
  useGetInfiniteInvest: vi.fn(),
}));

vi.mock('../../../api/orders/usePostOrder', () => ({
  usePostOrder: vi.fn(),
}));

vi.mock('@/hooks/useWebsocket', () => ({
  useWebsocket: vi.fn(),
}));

vi.mock('@/hooks/websocket/useAsset', () => ({
  useAsset: vi.fn(),
  useSummary: vi.fn(),
}));

const navigateFn = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateFn,
  };
});

describe('<Asset /> 통합 테스트', () => {
  beforeEach(() => {
    mockUseUserStore({ user: { id: 1, nickname: '코린이' } });

    mockUseAssetStore({
      myAsset: {
        assetCash: null,
        totalAsset: null,
        assetCanOrder: null,
      },
      summary: {
        totalBuyAmount: 0,
        totalEvaluation: 0,
        totalProfit: 0,
        totalProfitRate: 0,
      },
    });

    (useWebsocket as Mock).mockReturnValue({
      isConnected: true,
      stompClientRef: { current: {} },
      connect: vi.fn(),
      disconnect: vi.fn(),
    });

    (useGetMyAsset as Mock).mockReturnValue({ data: null });
    (useGetInfiniteInvest as Mock).mockReturnValue({
      data: {
        pages: [
          {
            totalBuyAmount: 0,
            totalEvaluation: 0,
            totalProfit: 0,
            totalProfitRate: 0,
            assetList: [],
            hasNext: false,
          },
        ],
        pageParams: [0],
      },
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isFetching: false,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });
  describe('기본 자산 지급 테스트', () => {
    it('AS-01: 신규 회원가입 시 기본 자산 지급', async () => {
      (useGetMyAsset as Mock).mockReturnValue({
        data: {
          assetCash: 500000000,
          totalAsset: 500000000,
          assetCanOrder: 100000000,
        },
      });

      (useGetInfiniteInvest as Mock).mockReturnValue({
        data: {
          pages: [
            {
              totalBuyAmount: 0,
              totalEvaluation: 0,
              totalProfit: 0,
              totalProfitRate: 0,
              assetList: [],
              hasNext: false,
            },
          ],
          pageParams: [0],
        },
        fetchNextPage: vi.fn(),
        hasNextPage: false,
        isFetching: false,
      });

      await render(<Asset />);
      await waitFor(() => {
        const cashElements = screen.getAllByText('500,000,000');
        expect(cashElements.length).toBeGreaterThan(0);
      });

      expect(screen.getByText('주문가능')).toBeInTheDocument();
    });
    it('AS-02: 기본 자산 중복 지급 방지', async () => {
      (useGetMyAsset as Mock).mockReturnValue({
        data: {
          assetCash: 500000000,
          totalAsset: 500000000,
          assetCanOrder: 500000000,
        },
      });

      (useGetInfiniteInvest as Mock).mockReturnValue({
        data: {
          pages: [
            {
              totalBuyAmount: 0,
              totalEvaluation: 0,
              totalProfit: 0,
              totalProfitRate: 0,
              assetList: [],
              hasNext: false,
            },
          ],
          pageParams: [0],
        },
        fetchNextPage: vi.fn(),
        hasNextPage: false,
        isFetching: false,
      });

      const { unmount } = await render(<Asset />);

      await waitFor(() => {
        expect(screen.getAllByText('500,000,000').length).toBeGreaterThan(0);
      });

      unmount();

      await render(<Asset />);

      await waitFor(() => {
        expect(screen.getAllByText('500,000,000').length).toBeGreaterThan(0);
      });
    });
  });

  describe('매도, 매수, 체결 테스트', () => {
    it('AS-04: 단일 종목 매수 후 보유자산 반영', async () => {
      (useGetMyAsset as Mock).mockReturnValue({
        data: {
          assetCash: 500000000,
          totalAsset: 500000000,
          assetCanOrder: 500000000,
        },
      });

      (useGetInfiniteInvest as Mock).mockReturnValue({
        data: {
          pages: [
            {
              totalBuyAmount: 0,
              totalEvaluation: 0,
              totalProfit: 0,
              totalProfitRate: 0,
              assetList: [],
              hasNext: false,
            },
          ],
          pageParams: [0],
        },
        fetchNextPage: vi.fn(),
        hasNextPage: false,
        isFetching: false,
      });

      const mockMutate = vi.fn();
      (usePostOrder as Mock).mockReturnValue({
        mutate: mockMutate,
        mutateAsync: vi.fn(),
        isPending: false,
        isError: false,
        isSuccess: false,
      });

      const { rerender } = await render(<Asset />);

      await waitFor(() => {
        expect(screen.getByText('보유 자산이 없습니다.')).toBeInTheDocument();
      });

      const onSuccessCallback = () => {
        (useGetMyAsset as Mock).mockReturnValue({
          data: {
            assetCash: 400000000,
            totalAsset: 500000000,
          },
        });

        (useGetInfiniteInvest as Mock).mockReturnValue({
          data: {
            pages: [
              {
                totalBuyAmount: 100000000,
                totalEvaluation: 100000000,
                totalProfit: 0,
                totalProfitRate: 0,
                assetList: [
                  {
                    categoryId: 1,
                    avgPrice: 100000000,
                    categoryName: '비트코인',
                    symbol: 'BTC',
                    investCount: 1,
                    currentPrice: 100000000,
                    buyAmount: 100000000,
                    evaluationAmount: 100000000,
                    evaluationProfit: 0,
                    profitRate: 0,
                  },
                ],
                hasNext: false,
              },
            ],
            pageParams: [0],
          },
          fetchNextPage: vi.fn(),
          hasNextPage: false,
          isFetching: false,
        });
      };

      act(() => {
        mockMutate(
          {
            memberId: 1,
            categoryId: 1,
            orderPrice: 100000000,
            orderCount: 1,
            orderType: 'BUY',
          },
          {
            onSuccess: onSuccessCallback,
          },
        );
      });

      act(() => {
        onSuccessCallback();
      });

      act(() => {
        mockUseAssetStore({
          myAsset: {
            assetCash: 400000000,
            totalAsset: 500000000,
            assetCanOrder: 100000000,
          },
          summary: {
            totalBuyAmount: 100000000,
            totalEvaluation: 100000000,
            totalProfit: 0,
            totalProfitRate: 0,
          },
        });
      });

      rerender(<Asset />);

      await waitFor(
        () => {
          expect(screen.getByText('BTC')).toBeInTheDocument();
          expect(screen.queryByText('보유 자산이 없습니다.')).not.toBeInTheDocument();
        },
        { timeout: 3000 },
      );
      await waitFor(() => {
        expect(screen.getAllByText('400,000,000').length).toBeGreaterThan(0);
      });
    });
    it('AS-05: 동일 종목 분할 매수 시 평단가 계산', async () => {
      (useGetInfiniteInvest as Mock).mockReturnValue({
        data: {
          pages: [
            {
              totalBuyAmount: 150000000,
              totalEvaluation: 160000000,
              totalProfit: 10000000,
              totalProfitRate: 6.66,
              assetList: [
                {
                  categoryId: 1,
                  categoryName: '비트코인',
                  symbol: 'BTC',

                  investCount: 2,

                  avgPrice: 75000000,

                  currentPrice: 80000000,
                  buyAmount: 150000000,
                  evaluationAmount: 160000000,
                  evaluationProfit: 10000000,
                  profitRate: 6.66,
                },
              ],
              hasNext: false,
            },
          ],
          pageParams: [0],
        },
        fetchNextPage: vi.fn(),
        hasNextPage: false,
        isFetching: false,
      });

      (useGetMyAsset as Mock).mockReturnValue({
        data: {
          assetCash: 350000000,
          totalAsset: 510000000,
        },
      });

      await render(<Asset />);

      await waitFor(() => {
        expect(screen.getByText('비트코인')).toBeInTheDocument();
        expect(screen.getByText(/2\.00/)).toBeInTheDocument();
        const avgPriceElements = screen.getAllByText('75,000,000');
        expect(avgPriceElements.length).toBeGreaterThan(0);
        expect(screen.getAllByText('160,000,000').length).toBeGreaterThan(0);
      });
    });
    it('AS-06: 일부 매도 후 보유자산 갱신', async () => {
      (useGetInfiniteInvest as Mock).mockReturnValue({
        data: {
          pages: [
            {
              totalBuyAmount: 75000000,
              totalEvaluation: 80000000,
              totalProfit: 5000000,
              totalProfitRate: 6.66,
              assetList: [
                {
                  categoryId: 1,
                  categoryName: '비트코인',
                  symbol: 'BTC',

                  investCount: 1,

                  avgPrice: 75000000,

                  currentPrice: 80000000,
                  buyAmount: 75000000,
                  evaluationAmount: 80000000,
                  evaluationProfit: 5000000,
                  profitRate: 6.66,
                },
              ],
              hasNext: false,
            },
          ],
          pageParams: [0],
        },
        fetchNextPage: vi.fn(),
        hasNextPage: false,
        isFetching: false,
      });

      (useGetMyAsset as Mock).mockReturnValue({
        data: {
          assetCash: 430000000,
          totalAsset: 510000000,
        },
      });

      await render(<Asset />);

      await waitFor(() => {
        expect(screen.getByText('비트코인')).toBeInTheDocument();

        expect(screen.getByText(/1\.00/)).toBeInTheDocument();

        const avgPriceElements = screen.getAllByText('75,000,000');
        expect(avgPriceElements.length).toBeGreaterThan(0);

        const cashElements = screen.getAllByText('430,000,000');
        expect(cashElements.length).toBeGreaterThan(0);
      });
    });
    it('AS-07: 전량 매도 후 보유자산 목록 처리', async () => {
      (useGetInfiniteInvest as Mock).mockReturnValue({
        data: {
          pages: [
            {
              totalBuyAmount: 0,
              totalEvaluation: 0,
              totalProfit: 0,
              totalProfitRate: 0,
              assetList: [],
              hasNext: false,
            },
          ],
          pageParams: [0],
        },
        fetchNextPage: vi.fn(),
        hasNextPage: false,
        isFetching: false,
      });

      (useGetMyAsset as Mock).mockReturnValue({
        data: {
          assetCash: 500000000,
          totalAsset: 500000000,
        },
      });

      await render(<Asset />);

      await waitFor(() => {
        expect(screen.queryByText('BTC')).not.toBeInTheDocument();
        expect(screen.queryByText('비트코인')).not.toBeInTheDocument();

        expect(screen.getByText('보유 자산이 없습니다.')).toBeInTheDocument();
        expect(screen.getAllByText('500,000,000').length).toBeGreaterThan(0);
      });
    });
    it('AS-08: 다종목 보유 시 종목별 및 합계 계산', async () => {
      (useGetInfiniteInvest as Mock).mockReturnValue({
        data: {
          pages: [
            {
              totalBuyAmount: 120000000,
              totalEvaluation: 150000000,
              totalProfit: 30000000,
              totalProfitRate: 25.0,
              assetList: [
                {
                  categoryId: 1,
                  categoryName: '비트코인',
                  symbol: 'BTC',
                  investCount: 2,
                  avgPrice: 50000000,
                  currentPrice: 60000000,
                  buyAmount: 100000000,
                  evaluationAmount: 120000000,
                  evaluationProfit: 20000000,
                  profitRate: 20.0,
                },
                {
                  categoryId: 2,
                  categoryName: '이더리움',
                  symbol: 'ETH',
                  investCount: 10,
                  avgPrice: 2000000,
                  currentPrice: 3000000,
                  buyAmount: 20000000,
                  evaluationAmount: 30000000,
                  evaluationProfit: 10000000,
                  profitRate: 50.0,
                },
              ],
              hasNext: false,
            },
          ],
          pageParams: [0],
        },
        fetchNextPage: vi.fn(),
        hasNextPage: false,
        isFetching: false,
      });

      (useGetMyAsset as Mock).mockReturnValue({
        data: {
          assetCash: 50000000,
          totalAsset: 200000000, // 현금 0.5억 + 평가 1.5억 = 2억
        },
      });

      await render(<Asset />);

      await waitFor(() => {
        const btcRow = screen.getByText('비트코인').closest('tr');
        expect(btcRow).toBeInTheDocument();
        expect(within(btcRow!).getByText('120,000,000')).toBeInTheDocument();
        const ethRow = screen.getByText('이더리움').closest('tr');
        expect(ethRow).toBeInTheDocument();
        expect(within(ethRow!).getByText('30,000,000')).toBeInTheDocument();

        const totalEvalElements = screen.getAllByText('150,000,000');
        expect(totalEvalElements.length).toBeGreaterThan(0);
      });
    });
    it('AS-09: 시세 변동 시 평가금액 갱신', async () => {
      const initialData = {
        totalBuyAmount: 50000000,
        totalEvaluation: 50000000,
        totalProfit: 0,
        totalProfitRate: 0,
        assetList: [
          {
            categoryId: 1,
            categoryName: '비트코인',
            symbol: 'BTC',
            investCount: 1,
            avgPrice: 50000000,
            currentPrice: 50000000,
            buyAmount: 50000000,
            evaluationAmount: 50000000,
            evaluationProfit: 0,
            profitRate: 0,
          },
        ],
        hasNext: false,
      };

      (useGetInfiniteInvest as Mock).mockReturnValue({
        data: {
          pages: [initialData],
          pageParams: [0],
        },
        fetchNextPage: vi.fn(),
        hasNextPage: false,
        isFetching: false,
      });
      (useGetMyAsset as Mock).mockReturnValue({
        data: { assetCash: 0, totalAsset: 50000000 },
      });

      const { rerender } = await render(<Asset />);

      await waitFor(() => {
        expect(screen.getAllByText('50,000,000').length).toBeGreaterThan(0);
        expect(screen.getByText('비트코인')).toBeInTheDocument();
      });

      (useGetInfiniteInvest as Mock).mockReturnValue({
        data: {
          pages: [
            {
              totalBuyAmount: 50000000,
              totalEvaluation: 60000000,
              totalProfit: 10000000,
              totalProfitRate: 20.0,
              assetList: [
                {
                  categoryId: 1,
                  categoryName: '비트코인',
                  symbol: 'BTC',
                  investCount: 1,
                  avgPrice: 50000000,
                  currentPrice: 60000000,
                  buyAmount: 50000000,
                  evaluationAmount: 60000000,
                  evaluationProfit: 10000000,
                  profitRate: 20.0,
                },
              ],
              hasNext: false,
            },
          ],
          pageParams: [0],
        },
        fetchNextPage: vi.fn(),
        hasNextPage: false,
        isFetching: false,
      });

      rerender(<Asset />);

      await waitFor(() => {
        expect(screen.getAllByText('60,000,000').length).toBeGreaterThan(0);
        expect(screen.getAllByText('10,000,000').length).toBeGreaterThan(0);
      });
    });
  });

  describe('로그인 여부에 따른 자산 표시 테스트', () => {
    it('AS-11: 로그인된 상태에서 보유자산 조회', async () => {
      mockUseUserStore({ user: { id: 1, nickname: '코린이' } });
      await render(<Header />);
      const assetLink = screen.getByRole('link', { name: '보유자산' });
      expect(assetLink).toHaveAttribute('href', '/asset');
    });
    it('AS-12: 로그인되지 않은 상태에서 보유자산 조회', async () => {
      mockUseUserStore({ user: null });
      await render(<Header />);
      const assetLink = screen.getByRole('link', { name: '보유자산' });
      expect(assetLink).toHaveAttribute('href', '/login');
    });
  });
  describe('보유자산 렌더링 테스트', () => {
    it('AS-03: 보유 코인 없는 상태 표시', async () => {
      (useGetMyAsset as Mock).mockReturnValue({ data: null });
      (useGetInfiniteInvest as Mock).mockReturnValue({
        data: {
          pages: [
            {
              totalBuyAmount: 0,
              totalEvaluation: 0,
              totalProfit: 0,
              totalProfitRate: 0,
              assetList: [],
              hasNext: false,
            },
          ],
          pageParams: [0],
        },
        fetchNextPage: vi.fn(),
        hasNextPage: false,
        isFetching: false,
      });

      await render(<Asset />);

      await waitFor(() => {
        expect(screen.getByText('보유 자산이 없습니다.')).toBeInTheDocument();
      });
    });
    it('AS-13: 실시간 보유자산 업데이트 확인', async () => {
      (useGetInfiniteInvest as Mock).mockReturnValue({
        data: {
          pages: [
            {
              totalBuyAmount: 0,
              totalEvaluation: 0,
              totalProfit: 0,
              totalProfitRate: 0,
              assetList: [],
              hasNext: false,
            },
          ],
          pageParams: [0],
        },
        fetchNextPage: vi.fn(),
        hasNextPage: false,
        isFetching: false,
      });
      const { rerender } = await render(<Asset />);
      expect(screen.getByText('보유 자산이 없습니다.')).toBeInTheDocument();

      (useGetInfiniteInvest as Mock).mockReturnValue({
        data: {
          pages: [
            {
              totalBuyAmount: 0,
              totalEvaluation: 0,
              totalProfit: 0,
              totalProfitRate: 0,
              assetList: [
                {
                  categoryId: 1,
                  avgPrice: 1000000,
                  categoryName: '비트코인',
                  symbol: 'BTC',
                  investCount: 1,
                  currentPrice: 1000000,
                  buyAmount: 1000000,
                  evaluationAmount: 1000000,
                  evaluationProfit: 1000000,
                  profitRate: 1000000,
                },
              ],
              hasNext: false,
            },
          ],
          pageParams: [0],
        },
        fetchNextPage: vi.fn(),
        hasNextPage: false,
        isFetching: false,
      });

      rerender(<Asset />);

      await waitFor(() => {
        expect(screen.getByText('BTC')).toBeInTheDocument();
      });
    });
    it('AS-14: 보유자산 목록 상세 정보 확인', async () => {
      (useGetInfiniteInvest as Mock).mockReturnValue({
        data: {
          pages: [
            {
              totalBuyAmount: 0,
              totalEvaluation: 0,
              totalProfit: 0,
              totalProfitRate: 0,
              assetList: [
                {
                  categoryId: 1,
                  avgPrice: 1000000,
                  categoryName: '비트코인',
                  symbol: 'BTC',
                  investCount: 1,
                  currentPrice: 1000000,
                  buyAmount: 1000000,
                  evaluationAmount: 1000000,
                  evaluationProfit: 1000000,
                  profitRate: 1000000,
                },
              ],
              hasNext: false,
            },
          ],
          pageParams: [0],
        },
        fetchNextPage: vi.fn(),
        hasNextPage: false,
        isFetching: false,
      });
      await render(<Asset />);
      await waitFor(() => {
        expect(screen.getByText('BTC')).toBeInTheDocument();
      });
    });
  });

  describe('동시성 테스트', () => {
    it('AS-15: 동시에 매도,매수 체결', async () => {});
  });
});
