import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Mock, vi } from 'vitest';
import InfoCoin from '../InfoCoin';
import { useGetCategoryInfo } from '@/api/useGetCategoryInfo';
import { useGetInfiniteChart } from '@/hooks/infinite/useGetInfiniteChart';
import { useGetInfiniteChat } from '@/hooks/infinite/useGetInfiniteChat';
import { useWebsocket } from '@/hooks/useWebsocket';
import { useChatting } from '@/hooks/websocket/useChatting';
import { mockUseCategoryIdStore, mockUseChartStore, mockUseUserStore } from '@/lib/test/mockZustandStore';
import render from '@/lib/test/render';

vi.mock('../Chart.tsx', () => ({
  default: () => <div data-testid="mock-chart">차트 영역</div>,
}));
vi.mock('../chatting/Chatting.tsx', () => ({
  default: () => <div data-testid="mock-chatting">채팅 영역</div>,
}));
vi.mock('../PriceInfo.tsx', () => ({
  default: () => <div data-testid="mock-price-info">종목 정보 영역</div>,
}));
vi.mock('@/api/useGetCategoryInfo', () => ({
  useGetCategoryInfo: vi.fn(),
}));
vi.mock('@/hooks/infinite/useGetInfiniteChart', () => ({
  useGetInfiniteChart: vi.fn(),
}));
vi.mock('@/hooks/infinite/useGetInfiniteChat', () => ({
  useGetInfiniteChat: vi.fn(),
}));
vi.mock('@/hooks/useWebsocket', () => ({
  useWebsocket: vi.fn(),
}));
vi.mock('@/hooks/websocket/useChart', () => ({ useChart: vi.fn() }));
vi.mock('@/hooks/websocket/useTicker', () => ({ useTicker: vi.fn() }));
vi.mock('@/hooks/websocket/useChatting', () => ({ useChatting: vi.fn() }));

describe('<Chatting /> 통합 테스트', () => {
  beforeEach(() => {
    mockUseUserStore({ user: { id: 1, nickname: 'test' } });
    mockUseCategoryIdStore({ categoryId: 1 });
    mockUseChartStore({ chartDataList: [] });

    (useGetCategoryInfo as Mock).mockReturnValue({
      data: { categoryName: '비트코인', symbol: 'BTC' },
    });
    (useGetInfiniteChart as Mock).mockReturnValue({
      data: { pages: [] },
      fetchNextPage: vi.fn(),
      hasNextPage: false,
    });
    (useGetInfiniteChat as Mock).mockReturnValue({
      data: { pages: [] },
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isFetching: false,
    });
    (useChatting as Mock).mockReturnValue({
      isConnected: true,
      sendChat: vi.fn(),
      chatHistory: [],
    });
    (useWebsocket as Mock).mockReturnValue({
      isConnected: true,
      stompClientRef: { current: {} },
      connect: vi.fn(),
      disconnect: vi.fn(),
    });
  });
  describe('렌더링 테스트', () => {
    it('C-01: 커뮤니티 탭 선택', async () => {
      const user = userEvent.setup();
      render(<InfoCoin />);

      await user.click(screen.getByText('커뮤니티'));
      expect(screen.getByTestId('mock-chatting')).toBeInTheDocument();
      expect(screen.queryByTestId('mock-chart')).not.toBeInTheDocument();
    });
    it('C-02: 채팅 내역 조회', async () => {
      // C-02 테스트에서는 실제 Chatting 컴포넌트를 사용하기 위해 모킹 해제
      vi.doUnmock('../chatting/Chatting.tsx');
      const { default: ChattingComponent } = await import('../chatting/Chatting');

      (useGetInfiniteChat as Mock).mockReturnValue({
        data: {
          pages: [
            [
              {
                chatId: 1,
                chatContent: 'test message',
                chatTime: '2024-01-01T12:00:00',
                memberId: 1,
                memberNickname: 'test',
              },
            ],
          ],
        },
        fetchNextPage: vi.fn(),
        hasNextPage: false,
        isFetching: false,
      });
      (useChatting as Mock).mockReturnValue({
        isConnected: true,
        sendChat: vi.fn(),
        chatHistory: [],
      });
      await render(<ChattingComponent />);
      expect(screen.getByText('test message')).toBeInTheDocument();
    });
    it('C-03: 채팅 내역 조회(채팅로그 없을 시)', async () => {
      vi.doUnmock('../chatting/Chatting.tsx');
      const { default: ChattingComponent } = await import('../chatting/Chatting');

      (useGetInfiniteChat as Mock).mockReturnValue({
        data: { pages: [[]] },
        fetchNextPage: vi.fn(),
        hasNextPage: false,
        isFetching: false,
      });
      (useChatting as Mock).mockReturnValue({
        isConnected: true,
        sendChat: vi.fn(),
        chatHistory: [],
      });
      await render(<ChattingComponent />);
      expect(screen.getByText('채팅 내역이 없습니다.')).toBeInTheDocument();
    });
    it('C-04: 채팅 내역 날짜 기준 구분 표시', async () => {
      vi.doUnmock('../chatting/Chatting.tsx');
      const { default: ChattingComponent } = await import('../chatting/Chatting');

      (useGetInfiniteChat as Mock).mockReturnValue({
        data: {
          pages: [
            [
              {
                chatId: 1,
                chatContent: 'test message',
                chatTime: '2024-01-01T13:00:00',
                memberId: 1,
                memberNickname: 'test',
              },
            ],
          ],
        },
        fetchNextPage: vi.fn(),
        hasNextPage: false,
        isFetching: false,
      });
      (useChatting as Mock).mockReturnValue({
        isConnected: true,
        sendChat: vi.fn(),
        chatHistory: [],
      });
      await render(<ChattingComponent />);

      expect(screen.getByText('2024-01-01')).toBeInTheDocument();

      const timeElement = screen.getByText(/01:00|13:00|오후/i);
      expect(timeElement).toBeInTheDocument();
    });
    it('C-09: 종목 변경', async () => {
      mockUseCategoryIdStore({ categoryId: 1 });

      vi.doUnmock('../chatting/Chatting.tsx');
      const { default: ChattingComponent } = await import('../chatting/Chatting');

      // BTC 채팅 내역 Mock
      (useChatting as Mock).mockReturnValue({
        chatHistory: [
          {
            chatId: 1,
            chatContent: '비트코인 가즈아!',
            chatTime: '2024-01-01T10:00:00',
            memberId: 2,
            memberNickname: '개미1',
            categoryId: 1,
          },
        ],
        sendChat: vi.fn(),
        isConnected: true,
      });

      const { rerender } = await render(<ChattingComponent />);

      // 초기 렌더링 확인 (BTC)
      expect(screen.getByText('비트코인 가즈아!')).toBeInTheDocument();
      expect(useChatting).toHaveBeenCalledWith({ categoryId: 1 }); // 훅 호출 인자 검증

      act(() => {
        mockUseCategoryIdStore({ categoryId: 2 });
      });

      (useChatting as Mock).mockReturnValue({
        chatHistory: [
          {
            chatId: 2,
            chatContent: '이더리움이 미래다',
            chatTime: '2024-01-01T11:00:00',
            memberId: 3,
            memberNickname: '개미2',
            categoryId: 2,
          },
        ],
        sendChat: vi.fn(),
        isConnected: true,
      });

      rerender(<ChattingComponent />);

      await waitFor(() => {
        expect(screen.queryByText('비트코인 가즈아!')).not.toBeInTheDocument();
        expect(screen.getByText('이더리움이 미래다')).toBeInTheDocument();
      });

      expect(useChatting).toHaveBeenCalledWith({ categoryId: 2 });

      expect(useGetInfiniteChat).toHaveBeenCalledWith(2, 10);
    });
    it('C-10: 시세 탭으로 이동', async () => {
      const user = userEvent.setup();
      render(<InfoCoin />);

      await user.click(screen.getByText('커뮤니티'));
      expect(screen.getByTestId('mock-chatting')).toBeInTheDocument();

      const chartTabButton = screen.getByText('시세');
      await user.click(chartTabButton);

      expect(screen.queryByTestId('mock-chatting')).not.toBeInTheDocument();
      expect(screen.queryByTestId('mock-price-info')).toBeInTheDocument();
    });
  });

  describe('기능 테스트', () => {
    beforeEach(() => {
      mockUseUserStore({ user: { id: 1, nickname: 'test' } });
      mockUseCategoryIdStore({ categoryId: 1 });
      (useWebsocket as Mock).mockReturnValue({ isConnected: true, stompClientRef: { current: {} } });
    });
    it('C-05: 메시지 작성', async () => {
      vi.doUnmock('../chatting/Chatting.tsx');
      const { default: ChattingComponent } = await import('../chatting/Chatting');

      (useGetInfiniteChat as Mock).mockReturnValue({
        data: { pages: [] },
        fetchNextPage: vi.fn(),
        hasNextPage: false,
        isFetching: false,
      });
      (useChatting as Mock).mockReturnValue({
        isConnected: true,
        sendChat: vi.fn(),
        chatHistory: [],
      });

      const { user } = await render(<ChattingComponent />);
      const input = screen.getByPlaceholderText('메시지를 입력해주세요.');

      await user.type(input, 'test message');

      expect(input).toHaveValue('test message');
      expect(screen.getByText('12/500')).toBeInTheDocument();
    });
    it('C-06: 메시지 발송', async () => {
      vi.doUnmock('../chatting/Chatting.tsx');
      const { default: ChattingComponent } = await import('../chatting/Chatting');

      const sendChatMock = vi.fn();
      let chatHistory: Array<{
        chatId: number;
        categoryId: number;
        chatTime: string;
        chatContent: string;
        memberId: number;
        memberNickname: string;
      }> = [];

      (useGetInfiniteChat as Mock).mockReturnValue({
        data: { pages: [] },
        fetchNextPage: vi.fn(),
        hasNextPage: false,
        isFetching: false,
      });

      sendChatMock.mockImplementation((message: string) => {
        chatHistory = [
          {
            chatId: Date.now(),
            categoryId: 1,
            chatTime: new Date().toISOString(),
            chatContent: message,
            memberId: 1,
            memberNickname: 'test',
          },
        ];
        (useChatting as Mock).mockReturnValue({
          isConnected: true,
          sendChat: sendChatMock,
          chatHistory,
        });
      });

      (useChatting as Mock).mockReturnValue({
        isConnected: true,
        sendChat: sendChatMock,
        chatHistory: [],
      });

      const { user } = await render(<ChattingComponent />);
      const input = screen.getByPlaceholderText('메시지를 입력해주세요.');

      await user.type(input, 'test message');
      await user.type(input, '{enter}');

      expect(sendChatMock).toHaveBeenCalledWith('test message');

      expect(input).toHaveValue('');
      expect(screen.getByText('0/500')).toBeInTheDocument();
    });
    it('C-07: 메시지 발송(입력한 메시지 없을 시)', async () => {
      vi.doUnmock('../chatting/Chatting.tsx');
      const { default: ChattingComponent } = await import('../chatting/Chatting');

      const sendChatMock = vi.fn();
      let chatHistory: Array<{
        chatId: number;
        categoryId: number;
        chatTime: string;
        chatContent: string;
        memberId: number;
        memberNickname: string;
      }> = [];

      (useGetInfiniteChat as Mock).mockReturnValue({
        data: { pages: [] },
        fetchNextPage: vi.fn(),
        hasNextPage: false,
        isFetching: false,
      });

      sendChatMock.mockImplementation((message: string) => {
        chatHistory = [
          {
            chatId: Date.now(),
            categoryId: 1,
            chatTime: new Date().toISOString(),
            chatContent: message,
            memberId: 1,
            memberNickname: 'test',
          },
        ];
        (useChatting as Mock).mockReturnValue({
          isConnected: true,
          sendChat: sendChatMock,
          chatHistory,
        });
      });

      (useChatting as Mock).mockReturnValue({
        isConnected: true,
        sendChat: sendChatMock,
        chatHistory: [],
      });

      const { user } = await render(<ChattingComponent />);
      const input = screen.getByPlaceholderText('메시지를 입력해주세요.');

      await user.type(input, '{enter}');

      expect(sendChatMock).not.toHaveBeenCalled();
      expect(input).toHaveValue('');
      expect(screen.getByText('0/500')).toBeInTheDocument();
    });
    it('C-08: 실시간 메시지 수신', async () => {
      vi.doUnmock('../chatting/Chatting.tsx');
      const { default: ChattingComponent } = await import('../chatting/Chatting');

      (useGetInfiniteChat as Mock).mockReturnValue({
        data: { pages: [] },
        fetchNextPage: vi.fn(),
        hasNextPage: false,
        isFetching: false,
      });

      (useChatting as Mock).mockReturnValue({
        chatHistory: [],
        sendChat: vi.fn(),
        isConnected: true,
      });

      const { rerender } = await render(<ChattingComponent />);

      expect(screen.queryByText('안녕하세요!')).not.toBeInTheDocument();

      (useChatting as Mock).mockReturnValue({
        chatHistory: [
          {
            chatId: 100,
            categoryId: 1,
            memberId: 2,
            memberNickname: '타인',
            chatContent: '안녕하세요!',
            chatTime: '2024-01-01T12:00:00',
          },
        ],
        sendChat: vi.fn(),
        isConnected: true,
      });

      rerender(<ChattingComponent />);

      expect(screen.getByText('안녕하세요!')).toBeInTheDocument();
      expect(screen.getByText('타인')).toBeInTheDocument();
    });
  });

  describe('예외 테스트', () => {
    it('C-11: 500자 이상의 메세지 작성', async () => {
      vi.doUnmock('../chatting/Chatting.tsx');
      const { default: ChattingComponent } = await import('../chatting/Chatting');

      (useChatting as Mock).mockReturnValue({
        chatHistory: [],
        sendChat: vi.fn(),
        isConnected: true,
      });

      await render(<ChattingComponent />);

      const input = screen.getByPlaceholderText('메시지를 입력해주세요.');

      const longText = 'A'.repeat(510);

      // 사용자가 붙여넣기하거나 빠르게 입력하여 onChange가 발생했다고 가정
      fireEvent.change(input, { target: { value: longText } });

      await waitFor(() => {
        expect(input).toHaveValue('A'.repeat(500));
        expect(screen.getByText('500/500')).toBeInTheDocument();
      });
    });
    it('C-12: 비로그인 사용자의 메시지 발송 시도', async () => {
      mockUseUserStore({ user: null });
      mockUseCategoryIdStore({ categoryId: 1 });

      vi.doUnmock('../chatting/Chatting.tsx');
      const { default: ChattingComponent } = await import('../chatting/Chatting');

      (useGetInfiniteChat as Mock).mockReturnValue({
        data: { pages: [] },
        fetchNextPage: vi.fn(),
        hasNextPage: false,
        isFetching: false,
      });
      (useChatting as Mock).mockReturnValue({
        isConnected: true,
        sendChat: vi.fn(),
        chatHistory: [],
      });

      await render(<ChattingComponent />);

      expect(screen.queryByPlaceholderText('메시지를 입력해주세요.')).not.toBeInTheDocument();
    });
    it('C-13: 동일 사용자 다중 종목 메시지 발송 시 혼선 방지', async () => {
      vi.doUnmock('../chatting/Chatting.tsx');
      const { default: ChattingComponent } = await import('../chatting/Chatting');
      const user = userEvent.setup();

      mockUseCategoryIdStore({ categoryId: 1 });

      const sendChatMockA = vi.fn();
      (useChatting as Mock).mockReturnValue({
        chatHistory: [],
        sendChat: sendChatMockA,
        isConnected: true,
      });

      const { rerender } = await render(<ChattingComponent />);

      const input = screen.getByPlaceholderText('메시지를 입력해주세요.');
      await user.type(input, 'A 종목 메시지{Enter}');

      expect(sendChatMockA).toHaveBeenCalledWith('A 종목 메시지');

      (useChatting as Mock).mockReturnValue({
        chatHistory: [
          {
            chatId: 1,
            chatContent: 'A 종목 메시지',
            chatTime: '2024-01-01T12:00:00',
            memberId: 1,
            memberNickname: '나',
            categoryId: 1,
          },
        ],
        sendChat: sendChatMockA,
        isConnected: true,
      });

      rerender(<ChattingComponent />);

      expect(screen.getByText('A 종목 메시지')).toBeInTheDocument();

      act(() => {
        mockUseCategoryIdStore({ categoryId: 2 });
      });

      const sendChatMockB = vi.fn();
      (useChatting as Mock).mockReturnValue({
        chatHistory: [],
        sendChat: sendChatMockB,
        isConnected: true,
      });

      rerender(<ChattingComponent />);

      expect(screen.queryByText('A 종목 메시지')).not.toBeInTheDocument();

      const inputB = screen.getByPlaceholderText('메시지를 입력해주세요.');
      await user.type(inputB, 'B 종목 메시지{Enter}');

      expect(sendChatMockB).toHaveBeenCalledWith('B 종목 메시지');

      (useChatting as Mock).mockReturnValue({
        chatHistory: [
          {
            chatId: 2,
            chatContent: 'B 종목 메시지',
            chatTime: '2024-01-01T12:05:00',
            memberId: 1,
            memberNickname: '나',
            categoryId: 2,
          },
        ],
        sendChat: sendChatMockB,
        isConnected: true,
      });

      rerender(<ChattingComponent />);

      await waitFor(() => {
        expect(screen.getByText('B 종목 메시지')).toBeInTheDocument();
        expect(screen.queryByText('A 종목 메시지')).not.toBeInTheDocument();
      });
    });
    it('C-14: 사용자가 욕설 했을 때 필터링', () => {});
    it('C-15: 사용자가 동일한 메시지를 일정 횟수 이상 연속적으로 보낼 시 제재', () => {});
  });
});
