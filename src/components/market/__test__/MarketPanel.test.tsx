import { screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, it, beforeEach, afterEach, expect, vi } from 'vitest';
import { ModalProvider } from '@/components/common/Modal/ModalProvider';
import MarketPanel from '@/components/market/MarketPanel';
import { WebsocketProvider } from '@/hooks/useWebsocket';
import { mockUseUserStore } from '@/lib/test/mockZustandStore';
import render from '@/lib/test/render';
import { testServer } from '@/mocks/testServer';
import useCategoryIdStore from '@/store/useCategoryId';
import useUserStore from '@/store/useUserStore';
// MarketPanel의 정렬 순서 전환 로직 <단위테스트>

type SortPriceArray = 'descending' | 'ascending' | 'base';

describe('getNextSortOrder', () => {
  // 정렬 순서 전환 함수
  const getNextSortOrder = (current: SortPriceArray): SortPriceArray => {
    if (current === 'base') return 'descending';
    if (current === 'descending') return 'ascending';
    return 'base';
  };

  it('base에서 내림차순으로 전환된다', () => {
    // Arrange
    const current: SortPriceArray = 'base';

    // Act
    const result = getNextSortOrder(current);

    // Assert
    expect(result).toBe('descending');
  });

  it('descending에서 오름차순으로 전환된다', () => {
    // Arrange
    const current: SortPriceArray = 'descending';

    // Act
    const result = getNextSortOrder(current);

    // Assert
    expect(result).toBe('ascending');
  });

  it('ascending에서 기본 배열로 전환된다', () => {
    // Arrange
    const current: SortPriceArray = 'ascending';

    // Act
    const result = getNextSortOrder(current);

    // Assert
    expect(result).toBe('base');
  });
});

// 통합테스트
const mockNavigate = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const categories = [
  {
    categoryId: 1,
    categoryName: '비트코인',
    symbol: 'BTC',
    tradePrice: 100_000,
    changeRate: 1.23,
    changeAmount: 123,
    openPrice: 0,
    dailyHigh: 0,
    dailyLow: 0,
    accVolume: 0,
    accAmount: 10_000_000,
  },
  {
    categoryId: 2,
    categoryName: '이더리움',
    symbol: 'ETH',
    tradePrice: 50_000,
    changeRate: -0.5,
    changeAmount: -10,
    openPrice: 0,
    dailyHigh: 0,
    dailyLow: 0,
    accVolume: 0,
    accAmount: 8_000_000,
  },
  {
    categoryId: 3,
    categoryName: '리플',
    symbol: 'XRP',
    tradePrice: 70_000,
    changeRate: 0.25,
    changeAmount: 5,
    openPrice: 0,
    dailyHigh: 0,
    dailyLow: 0,
    accVolume: 0,
    accAmount: 30_000_000,
  },
];

const initialUserState = useUserStore.getState();
const initialCategoryState = useCategoryIdStore.getState();

describe('MarketPanel', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    window.localStorage.clear();
    useUserStore.setState(initialUserState, true);
    useCategoryIdStore.setState(initialCategoryState, true);

    testServer.use(
      http.get('*/api/categories', () => HttpResponse.json(categories)),
      http.get('*/api/invest/summary', () =>
        HttpResponse.json({
          totalBuyAmount: 0,
          totalEvaluation: 0,
          totalProfit: 0,
          totalProfitRate: 0,
          assetList: [],
        }),
      ),
      http.get('*/api/interests', () => HttpResponse.json([])),
    );
  });

  afterEach(() => {
    useUserStore.setState(initialUserState, true);
    useCategoryIdStore.setState(initialCategoryState, true);
  });

  const renderPanel = async () =>
    render(
      <WebsocketProvider>
        <ModalProvider>
          <MarketPanel />
        </ModalProvider>
      </WebsocketProvider>,
    );

  const getKrwOrder = () => screen.getAllByText(/비트코인|이더리움|리플/).map((el) => el.textContent);
  const getHoldingOrder = () => screen.getAllByText(/BTC|ETH|XRP/).map((el) => el.textContent);

  const useHoldingSortData = () => {
    mockUseUserStore({ user: { id: 123, nickname: '테스터' } });
    testServer.use(
      http.get('*/api/invest/summary', () =>
        HttpResponse.json({
          totalBuyAmount: 0,
          totalEvaluation: 0,
          totalProfit: 0,
          totalProfitRate: 0,
          assetList: [
            {
              categoryId: 1,
              avgPrice: 3000,
              categoryName: '비트코인',
              symbol: 'BTC',
              investCount: 1,
              currentPrice: 0,
              buyAmount: 1000,
              evaluationAmount: 2000,
              evaluationProfit: 0,
              profitRate: 10,
            },

            {
              categoryId: 2,
              avgPrice: 1000,
              categoryName: '이더리움',
              symbol: 'ETH',
              investCount: 1,
              currentPrice: 0,
              buyAmount: 1000,
              evaluationAmount: 500,
              evaluationProfit: 0,
              profitRate: -5,
            },

            {
              categoryId: 3,
              avgPrice: 2000,
              categoryName: '리플',
              symbol: 'XRP',
              investCount: 1,
              currentPrice: 0,
              buyAmount: 1000,
              evaluationAmount: 1500,
              evaluationProfit: 0,
              profitRate: 2,
            },
          ],
        }),
      ),
    );
  };

  const useInterestDynamicHandlers = () => {
    let interests: Array<{ interestId: number; memberId: number; categoryId: number }> = [];
    let nextInterestId = 1;

    testServer.use(
      http.get('*/api/interests', ({ request }) => {
        const url = new URL(request.url);
        const memberId = Number(url.searchParams.get('memberId'));
        return HttpResponse.json(interests.filter((i) => i.memberId === memberId));
      }),
      http.post('*/api/interests', async ({ request }) => {
        const body = (await request.json()) as { memberId: number; categoryId: number };
        const created = { interestId: nextInterestId++, memberId: body.memberId, categoryId: body.categoryId };
        interests = [...interests, created];
        return HttpResponse.json(created);
      }),
      http.delete('*/api/interests/:interestId', ({ params, request }) => {
        const url = new URL(request.url);
        const memberId = Number(url.searchParams.get('memberId'));
        const interestId = Number(params.interestId);
        interests = interests.filter((i) => !(i.memberId === memberId && i.interestId === interestId));
        return new HttpResponse(null, { status: 204 });
      }),
    );
  };

  // 로그인 전 관심, 보유 탭 데이터 보여주기
  it('M-4: 관심 탭 클릭 (로그인 전)', async () => {
    const { user } = await renderPanel();
    await user.click(screen.getByText('관심'));
    expect(await screen.findByText('로그인하면 내 관심코인을 확인할 수 있습니다.')).toBeInTheDocument();
  });

  it('M-5: 보유 탭 클릭 (로그인 전)', async () => {
    const { user } = await renderPanel();
    await user.click(screen.getByText('보유'));
    expect(await screen.findByText('로그인하면 내 보유자산을 확인할 수 있습니다.')).toBeInTheDocument();
  });

  // 오르내림 정렬
  it('M-11: 현재가 컬럼 정렬 클릭 (내림차순)', async () => {
    const { user } = await renderPanel();
    expect(await screen.findByText('비트코인')).toBeInTheDocument();
    await user.click(screen.getByText('현재가'));
    expect(getKrwOrder()).toEqual(['비트코인', '리플', '이더리움']);
  });

  it('M-12: 현재가 컬럼 정렬 클릭 (오름차순)', async () => {
    const { user } = await renderPanel();
    expect(await screen.findByText('비트코인')).toBeInTheDocument();
    await user.click(screen.getByText('현재가'));
    await user.click(screen.getByText('현재가'));
    expect(getKrwOrder()).toEqual(['이더리움', '리플', '비트코인']);
  });

  it('M-13: 현재가 컬럼 정렬 클릭 (정렬 해제)', async () => {
    const { user } = await renderPanel();
    expect(await screen.findByText('비트코인')).toBeInTheDocument();
    await user.click(screen.getByText('현재가'));
    await user.click(screen.getByText('현재가'));
    await user.click(screen.getByText('현재가'));
    expect(getKrwOrder()).toEqual(['비트코인', '이더리움', '리플']);
  });

  it('M-14: 전일대비 컬럼 정렬 클릭 (내림차순)', async () => {
    const { user } = await renderPanel();
    expect(await screen.findByText('비트코인')).toBeInTheDocument();
    await user.click(screen.getByText('전일대비'));
    expect(getKrwOrder()).toEqual(['비트코인', '리플', '이더리움']);
  });

  it('M-15: 전일대비 컬럼 정렬 클릭 (오름차순)', async () => {
    const { user } = await renderPanel();
    expect(await screen.findByText('비트코인')).toBeInTheDocument();
    await user.click(screen.getByText('전일대비'));
    await user.click(screen.getByText('전일대비'));
    expect(getKrwOrder()).toEqual(['이더리움', '리플', '비트코인']);
  });

  it('M-16: 전일대비 컬럼 정렬 클릭 (정렬 해제)', async () => {
    const { user } = await renderPanel();
    expect(await screen.findByText('비트코인')).toBeInTheDocument();
    await user.click(screen.getByText('전일대비'));
    await user.click(screen.getByText('전일대비'));
    await user.click(screen.getByText('전일대비'));
    expect(getKrwOrder()).toEqual(['비트코인', '이더리움', '리플']);
  });

  it('M-17: 거래대금 컬럼 정렬 클릭 (내림차순)', async () => {
    const { user } = await renderPanel();
    expect(await screen.findByText('비트코인')).toBeInTheDocument();
    await user.click(screen.getByText('거래대금'));
    expect(getKrwOrder()).toEqual(['리플', '비트코인', '이더리움']);
  });

  it('M-18: 거래대금 컬럼 정렬 클릭 (오름차순)', async () => {
    const { user } = await renderPanel();
    expect(await screen.findByText('비트코인')).toBeInTheDocument();
    await user.click(screen.getByText('거래대금'));
    await user.click(screen.getByText('거래대금'));
    expect(getKrwOrder()).toEqual(['이더리움', '비트코인', '리플']);
  });

  it('M-19: 거래대금 컬럼 정렬 클릭 (정렬 해제)', async () => {
    const { user } = await renderPanel();
    expect(await screen.findByText('비트코인')).toBeInTheDocument();
    await user.click(screen.getByText('거래대금'));
    await user.click(screen.getByText('거래대금'));
    await user.click(screen.getByText('거래대금'));
    expect(getKrwOrder()).toEqual(['비트코인', '이더리움', '리플']);
  });

  it('M-20: 보유 탭 - 보유(평가금) 정렬 (내림차순)', async () => {
    useHoldingSortData();
    const { user } = await renderPanel();
    await user.click(screen.getByText('보유'));
    await user.click(screen.getByText('보유(평가금)'));
    expect(getHoldingOrder()).toEqual(['BTC', 'XRP', 'ETH']);
  });

  it('M-21: 보유 탭 - 보유(평가금) 정렬 (오름차순)', async () => {
    useHoldingSortData();
    const { user } = await renderPanel();
    await user.click(screen.getByText('보유'));
    await user.click(screen.getByText('보유(평가금)'));
    await user.click(screen.getByText('보유(평가금)'));
    expect(getHoldingOrder()).toEqual(['ETH', 'XRP', 'BTC']);
  });

  it('M-22: 보유 탭 - 보유(평가금) 정렬 (정렬 해제)', async () => {
    useHoldingSortData();
    const { user } = await renderPanel();
    await user.click(screen.getByText('보유'));
    await user.click(screen.getByText('보유(평가금)'));
    await user.click(screen.getByText('보유(평가금)'));
    await user.click(screen.getByText('보유(평가금)'));
    expect(getHoldingOrder()).toEqual(['BTC', 'ETH', 'XRP']);
  });

  it('M-23: 보유 탭 - 매수평균가 정렬 (내림차순)', async () => {
    useHoldingSortData();
    const { user } = await renderPanel();
    await user.click(screen.getByText('보유'));
    await user.click(screen.getByText('매수평균가'));
    expect(getHoldingOrder()).toEqual(['BTC', 'XRP', 'ETH']);
  });

  it('M-24: 보유 탭 - 매수평균가 정렬 (오름차순)', async () => {
    useHoldingSortData();
    const { user } = await renderPanel();
    await user.click(screen.getByText('보유'));
    await user.click(screen.getByText('매수평균가'));
    await user.click(screen.getByText('매수평균가'));
    expect(getHoldingOrder()).toEqual(['ETH', 'XRP', 'BTC']);
  });

  it('M-25: 보유 탭 - 매수평균가 정렬 (정렬해제)', async () => {
    useHoldingSortData();
    const { user } = await renderPanel();
    await user.click(screen.getByText('보유'));
    await user.click(screen.getByText('매수평균가'));
    await user.click(screen.getByText('매수평균가'));
    await user.click(screen.getByText('매수평균가'));
    expect(getHoldingOrder()).toEqual(['BTC', 'ETH', 'XRP']);
  });

  it('M-26: 보유 탭 - 수익률 정렬 (내림차순)', async () => {
    useHoldingSortData();
    const { user } = await renderPanel();
    await user.click(screen.getByText('보유'));
    await user.click(screen.getByText('수익률'));
    expect(getHoldingOrder()).toEqual(['BTC', 'XRP', 'ETH']);
  });

  it('M-27: 보유 탭 - 수익률 정렬 (오름차순)', async () => {
    useHoldingSortData();
    const { user } = await renderPanel();
    await user.click(screen.getByText('보유'));
    await user.click(screen.getByText('수익률'));
    await user.click(screen.getByText('수익률'));
    expect(getHoldingOrder()).toEqual(['ETH', 'XRP', 'BTC']);
  });

  it('M-28: 보유 탭 - 수익률 정렬 (정렬해제)', async () => {
    useHoldingSortData();
    const { user } = await renderPanel();
    await user.click(screen.getByText('보유'));
    await user.click(screen.getByText('수익률'));
    await user.click(screen.getByText('수익률'));
    await user.click(screen.getByText('수익률'));
    expect(getHoldingOrder()).toEqual(['BTC', 'ETH', 'XRP']);
  });

  // 관심 종목 추가, 삭제

  it('M-30: 관심 종목 추가 (로그인 전)', async () => {
    const { user } = await renderPanel();
    expect(await screen.findByText('비트코인')).toBeInTheDocument();

    await user.click(screen.getAllByRole('button', { name: '관심 추가' })[0]);

    expect(await screen.findByText('로그인 안내')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: '로그인' }));
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('M-31: 관심 종목 추가 (로그인 후)', async () => {
    mockUseUserStore({ user: { id: 123, nickname: '테스터' } });
    useInterestDynamicHandlers();
    const { user } = await renderPanel();
    expect(await screen.findByText('비트코인')).toBeInTheDocument();

    await user.click(screen.getAllByRole('button', { name: '관심 추가' })[0]);

    expect(await screen.findByRole('button', { name: '관심 해제' })).toBeInTheDocument();
  });

  it('M-32: 관심 종목 삭제', async () => {
    mockUseUserStore({ user: { id: 123, nickname: '테스터' } });
    useInterestDynamicHandlers();
    const { user } = await renderPanel();
    expect(await screen.findByText('비트코인')).toBeInTheDocument();

    await user.click(screen.getAllByRole('button', { name: '관심 추가' })[0]);
    expect(await screen.findByRole('button', { name: '관심 해제' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '관심 해제' }));
    expect(await screen.findAllByRole('button', { name: '관심 추가' })).toHaveLength(3);
  });

  // 관심 종목 추가 시 관심 탭 반영
  it('M-36: 관심 종목 추가 시 관심 탭 반영', async () => {
    mockUseUserStore({ user: { id: 123, nickname: '테스터' } });
    useInterestDynamicHandlers();
    const { user } = await renderPanel();
    expect(await screen.findByText('비트코인')).toBeInTheDocument();

    await user.click(screen.getAllByRole('button', { name: '관심 추가' })[0]);
    expect(await screen.findByRole('button', { name: '관심 해제' })).toBeInTheDocument();

    await user.click(screen.getByText('관심'));
    expect(await screen.findByText('비트코인')).toBeInTheDocument();
    expect(screen.queryByText('이더리움')).not.toBeInTheDocument();
    expect(screen.queryByText('리플')).not.toBeInTheDocument();
  });

  it('M-37: 관심 종목 삭제 시 관심 탭 반영', async () => {
    mockUseUserStore({ user: { id: 123, nickname: '테스터' } });
    useInterestDynamicHandlers();
    const { user } = await renderPanel();
    expect(await screen.findByText('비트코인')).toBeInTheDocument();

    await user.click(screen.getAllByRole('button', { name: '관심 추가' })[0]);
    expect(await screen.findByRole('button', { name: '관심 해제' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: '관심 해제' }));

    await user.click(screen.getByText('관심'));
    expect(await screen.findByText('표시할 종목이 없습니다.')).toBeInTheDocument();
    expect(screen.queryByText('비트코인')).not.toBeInTheDocument();
  });

  it('M-39: 빈 리스트 표시 (원화 탭)', async () => {
    testServer.use(http.get('*/api/categories', () => HttpResponse.json([])));
    await renderPanel();
    expect(await screen.findByText('표시할 종목이 없습니다.')).toBeInTheDocument();
  });

  it('M-40: 종목 리스트 빈 화면 (검색 결과 없음)', async () => {
    const { user } = await renderPanel();
    expect(await screen.findByText('비트코인')).toBeInTheDocument();

    await user.type(screen.getByPlaceholderText('코인명 / 심볼검색'), '없는검색어');

    expect(await screen.findByText('표시할 종목이 없습니다.')).toBeInTheDocument();
  });
});
