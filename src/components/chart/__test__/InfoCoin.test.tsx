import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Mock, vi } from 'vitest';
import InfoCoin from '../InfoCoin';
import { useGetCategoryInfo } from '@/api/useGetCategoryInfo';
import { useGetInfiniteChart } from '@/hooks/infinite/useGetInfiniteChart';
import { useWebsocket } from '@/hooks/useWebsocket';
import { mockUseCategoryIdStore, mockUseChartStore } from '@/lib/test/mockZustandStore';

vi.mock('../Chart.tsx', () => ({
  default: () => <div data-testid="mock-chart">차트 영역</div>
}));
vi.mock('../PriceInfo.tsx', () => ({
  default: () => <div data-testid="mock-price-info">종목 정보 영역</div>
}));
vi.mock('../chatting/Chatting.tsx', () => ({
  default: () => <div data-testid="mock-chatting">채팅 영역</div>
}));

vi.mock('@/api/useGetCategoryInfo', () => ({
    useGetCategoryInfo: vi.fn(),
}));
vi.mock('@/hooks/infinite/useGetInfiniteChart', () => ({
    useGetInfiniteChart: vi.fn(),
}));
vi.mock('@/hooks/useWebsocket', () => ({
    useWebsocket: vi.fn(),
}));
vi.mock('@/hooks/websocket/useChart', () => ({ useChart: vi.fn() }));
vi.mock('@/hooks/websocket/useTicker', () => ({ useTicker: vi.fn() }));

describe('<InfoCoin /> 통합 테스트', () => {
    beforeEach(()=>{
        mockUseCategoryIdStore({categoryId:1});
        mockUseChartStore({chartDataList:[]});

        (useGetCategoryInfo as Mock).mockReturnValue({
            data: { categoryName: '비트코인', symbol: 'BTC' },
          });
      
        (useGetInfiniteChart as Mock).mockReturnValue({
        data: { pages: [] },
        fetchNextPage: vi.fn(),
        hasNextPage: false,
        });

        (useWebsocket as Mock).mockReturnValue({
            isConnected: true,
            stompClientRef: { current: {} },
            connect: vi.fn(),
            disconnect: vi.fn(),
        });
    })
  it('TC-01: 거래소 페이지에서 코인 선택 시 차트 및 종목 정보 표시', async () => {
    (useGetInfiniteChart as Mock).mockReturnValue({
        data: {
          pages: [
            [{ time: 1000, open: 100, high: 110, low: 90, close: 105 }], 
          ],
        },
        fetchNextPage: vi.fn(),
        hasNextPage: false,
      });
    render(<InfoCoin />);

    expect(screen.getByText('비트코인 (BTC-KRW)')).toBeInTheDocument();
    expect(screen.getByTestId('mock-price-info')).toBeInTheDocument();
    expect(screen.getByTestId('mock-chart')).toBeInTheDocument();
  });

  it('TC-02: 차트 탭에서 커뮤니티 탭으로 전환', async () => {
    const user = userEvent.setup();
    render(<InfoCoin />);

    expect(screen.getByTestId('mock-price-info')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-chatting')).not.toBeInTheDocument();

    const chatTabButton = screen.getByText('커뮤니티'); 
    await user.click(chatTabButton);

    expect(screen.queryByTestId('mock-chart')).not.toBeInTheDocument();
    expect(screen.getByTestId('mock-chatting')).toBeInTheDocument();
  });
  it('TC-03: 커뮤니티 탭에서 차트 탭으로 전환', async () => {
    const user = userEvent.setup();
    render(<InfoCoin />)

    await user.click(screen.getByText('커뮤니티'));
    expect(screen.getByTestId('mock-chatting')).toBeInTheDocument();

    const chartTabButton = screen.getByText('시세'); 
    await user.click(chartTabButton);

    expect(screen.queryByTestId('mock-chatting')).not.toBeInTheDocument();
    expect(screen.queryByTestId('mock-price-info')).toBeInTheDocument();
  });
  it('TC-04: 차트 데이터가 없는 경우 표시', async () => {
    (useGetInfiniteChart as Mock).mockReturnValue({
        data: {
          pages: [
            [], 
          ],
        },
        fetchNextPage: vi.fn(),
        hasNextPage: false,
      });
    render(<InfoCoin />);
    expect(screen.getByText('차트 데이터가 없습니다.')).toBeInTheDocument();
  });
  it('TC-05: 실시간 차트 데이터 업데이트 확인', async () => {
    mockUseChartStore({ chartDataList: [] });
    render(<InfoCoin />);
    expect(screen.queryByTestId('mock-chart')).not.toBeInTheDocument();
    expect(screen.getByText('차트 데이터가 없습니다.')).toBeInTheDocument();
  
    act(() => {
      mockUseChartStore({
        chartDataList: [{ t: 1000, o: 100, h: 110, l: 90, c: 105 }],
      });
    });
  
    await waitFor(()=>{
        expect(screen.queryByTestId('mock-chart')).toBeInTheDocument();
    });
  });
  describe('웹소켓 연결 상태 테스트', () => {
    it('TC-06: 웹소켓 연결 끊어진 상태에서 차트 조회', async () => {
        (useWebsocket as Mock).mockReturnValue({
            isConnected: false, 
            stompClientRef: { current: null }
        });
    
        mockUseChartStore({
            chartDataList: [{ t: 1000, o: 100, h: 110, l: 90, c: 105 }], 
        });
    
        render(<InfoCoin />);
    
        expect(screen.getByTestId('mock-chart')).toBeInTheDocument();
        expect(screen.queryByText('차트 데이터가 없습니다.')).not.toBeInTheDocument();
      });
  });
  
});