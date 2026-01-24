import { waitFor, screen, act } from '@testing-library/react';
import { Mock, vi } from 'vitest';
import { useGetMyAsset } from '../../../api/asset/useGetAsset';
import { useGetInvest } from '../../../api/useGetInvest';
import { mockUseUserStore, mockUseAssetStore } from '../../../lib/test/mockZustandStore';
import Asset from '../Asset';
import Header from '@/components/layout/Header';
import { useWebsocket } from '@/hooks/useWebsocket';
import render from '@/lib/test/render';

vi.mock('../../../api/asset/useGetAsset', () => ({
  useGetMyAsset: vi.fn(),
}));

vi.mock('../../../api/useGetInvest', () => ({
  useGetInvest: vi.fn(),
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
          assetCash: null, 
          totalAsset: null, 
          summary: null 
        });

        (useWebsocket as Mock).mockReturnValue({
            isConnected: true,
            stompClientRef: { current: {} },
            connect: vi.fn(),
            disconnect: vi.fn(),
        });
    
        (useGetMyAsset as Mock).mockReturnValue({ data: null }); 
        (useGetInvest as Mock).mockReturnValue({ data: null });
      });

      afterEach(()=>{
        vi.restoreAllMocks();
      })
    describe('기본 자산 지급 테스트', () => {
        it('AS-01: 신규 회원가입 시 기본 자산 지급', async () => {
            (useGetMyAsset as Mock).mockReturnValue({
                data: {
                  assetCash: 500000000,
                  totalAsset: 500000000,
                },
              });
          
              (useGetInvest as Mock).mockReturnValue({
                data: {
                  totalBuyAmount: 0,
                  totalEvaluation: 0,
                  totalProfit: 0,
                  totalProfitRate: 0,
                  assetList: [],
                },
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
                },
              });
          
              (useGetInvest as Mock).mockReturnValue({
                  data: {
                    totalBuyAmount: 0, totalEvaluation: 0, totalProfit: 0, totalProfitRate: 0, assetList: [],
                  },
              });
          
              const { unmount } = await render(<Asset />);
              
              await waitFor(() => {
                expect(screen.getAllByText('500,000,000').length).toBeGreaterThan(0);
              });
          
              unmount();
          
              await render(<Asset />);
          
              await waitFor(() => {
                expect(screen.getAllByText('500,000,000').length).toBeGreaterThan(0);
                
                expect(screen.queryByText('1,000,000,000')).not.toBeInTheDocument();
              });
        });
    });

    describe('매도, 매수, 체결 테스트', () => {
        it('AS-04: 단일 종목 매수 후 보유자산 반영', async () => {
            
        });
        it('AS-05: 동일 종목 분할 매수 시 평단가 계산', async () => {});
        it('AS-06: 일부 매도 후 보유자산 갱신', async () => {});
        it('AS-07: 전량 매도 후 보유자산 목록 처리', async () => {});
        it('AS-08: 다종목 보유 시 종목별 및 합계 계산', async () => {});
        it('AS-09: 시세 변동 시 평가금액 갱신', async () => {});
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
            (useGetInvest as Mock).mockReturnValue({ data: null });

            await render(<Asset />);

            await waitFor(() => {
                expect(screen.getByText('보유 자산이 없습니다.')).toBeInTheDocument();
            });
        });
        it('AS-13: 실시간 보유자산 업데이트 확인', async () => {
            mockUseAssetStore({
                summary: {
                    totalBuyAmount: 0,
                    totalEvaluation: 0,
                    totalProfit: 0,
                    totalProfitRate: 0,
                    assetList: [],
                }
            });
            render(<Asset />);
            expect(screen.getByText('보유 자산이 없습니다.')).toBeInTheDocument();

            act(()=>{
                mockUseAssetStore({
                    summary: {
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
                    }
                });
            });
            await waitFor(() => {
                expect(screen.getByText('BTC')).toBeInTheDocument();
            });
        });
        it('AS-14: 보유자산 목록 상세 정보 확인', async () => {
            mockUseAssetStore({
                summary: {
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
                }
            });
            render(<Asset />);
            await waitFor(() => {
                expect(screen.getByText('BTC')).toBeInTheDocument();
            });
        });
    });

    describe('동시성 테스트', () => {
        it('AS-15: 동시에 매도,매수 체결', async () => {});
    });
});
