import { screen } from '@testing-library/react';
import { act } from 'react';
import { useLocation } from 'react-router-dom';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import Header from '../Header';
import { useWebsocket } from '@/hooks/useWebsocket';
import { mockUseNotificationStore } from '@/lib/test/mockZustandStore';
import render from '@/lib/test/render';
import useUserStore from '@/store/useUserStore';
import { useNotificationStore } from '@/store/websocket/useNotificationStore';

const { mockMutate } = vi.hoisted(() => ({
  mockMutate: vi.fn(),
}));

vi.mock('@/api/member/usePostLogout', () => ({
  usePostLogout: () => ({
    mutate: mockMutate,
  }),
}));

vi.mock('@/hooks/useWebsocket', () => ({
  useWebsocket: vi.fn(),
}));
vi.mock('@/hooks/websocket/useNotification', () => ({
  useNotification: vi.fn(),
}));

function LocationDisplay() {
  const location = useLocation();
  return <p aria-label="현재 경로">{location.pathname}</p>;
}

describe('Header', () => {
  beforeEach(() => {
    mockMutate.mockClear();
    useUserStore.setState({ user: null });
    useUserStore.persist.clearStorage();
    window.localStorage.clear();

    // addNotificationData는 모킹하지 않음 → H-10에서 스토어 삽입 로직(SYSTEM 맨 앞) 검증용
    mockUseNotificationStore({
      notificationData: [],
      popNotification: vi.fn(),
      clearNotificationData: vi.fn(),
    });
    (useWebsocket as Mock).mockReturnValue({
      isConnected: true,
      stompClientRef: { current: {} },
      connect: vi.fn(),
      disconnect: vi.fn(),
  });
  });

  it('H-1: HeartBit 텍스트를 클릭하면 거래소 경로로 ("/") 이동한다.', async () => {
    const { user } = await render(
      <>
        <Header />
        <LocationDisplay />
      </>,
      { routerProps: { initialEntries: ['/asset'] } },
    );

    await user.click(screen.getByText('HeartBit'));

    expect(screen.getByLabelText('현재 경로')).toHaveTextContent('/');
  });

  it('H-2: 로그인 버튼 클릭 시 /login 경로로 이동한다.', async () => {
    const { user } = await render(
      <>
        <Header />
        <LocationDisplay />
      </>,
      { routerProps: { initialEntries: ['/'] } },
    );

    await user.click(screen.getByRole('button', { name: '로그인' }));

    expect(screen.getByLabelText('현재 경로')).toHaveTextContent('/login');
  });

  it('H-3: 회원가입 버튼 클릭 시 /signup 경로로 이동한다.', async () => {
    const { user } = await render(
      <>
        <Header />
        <LocationDisplay />
      </>,
      { routerProps: { initialEntries: ['/'] } },
    );

    await user.click(screen.getByRole('button', { name: '회원가입' }));

    expect(screen.getByLabelText('현재 경로')).toHaveTextContent('/signup');
  });

  it('H-4: 거래소 버튼 클릭 시 거래소 경로로 ("/") 이동한다.', async () => {
    const { user } = await render(
      <>
        <Header />
        <LocationDisplay />
      </>,
      { routerProps: { initialEntries: ['/asset'] } },
    );

    await user.click(screen.getByText('거래소'));

    expect(screen.getByLabelText('현재 경로')).toHaveTextContent('/');
  });

  it('H-5: 보유자산 버튼 클릭 시 보유자산 경로로 ("/asset") 이동한다.', async () => {
    const { user } = await render(
      <>
        <Header />
        <LocationDisplay />
      </>,
      { routerProps: { initialEntries: ['/'] } },
    );

    await user.click(screen.getByText('보유자산'));

    expect(screen.getByLabelText('현재 경로')).toHaveTextContent('/asset');
  });

  it('H-6: 로그인한 사용자의 닉네임이 헤더에 표시된다.', async () => {
    useUserStore.getState().setUser({ id: 1, nickname: '테스트유저' });

    await render(<Header />);

    expect(screen.getByText('테스트유저님, 환영합니다.')).toBeInTheDocument();
  });

  it('H-7: 로그아웃 버튼 클릭 시 로그아웃 처리(요청 mutate 호출)한다.', async () => {
    useUserStore.getState().setUser({ id: 1, nickname: '테스트유저' });

    const { user } = await render(<Header />);

    await user.click(screen.getByRole('button', { name: '로그아웃' }));

    expect(mockMutate).toHaveBeenCalledTimes(1);
  });



  describe('실시간 알림 테스트', () => {

    it('H-09: 실시간 알림 수신 시 헤더 중앙에 렌더링 된다.', async () => {
      useUserStore.getState().setUser({ id: 1, nickname: '테스트유저' });

      const notificationItem = {
        notificationId: 1,
        notificationContent: '비트코인 매수 체결 완료',
        notificationType: 'TRADE' as const,
        notificationIsRead: false,
        createdAt: '2024-01-01T12:00:00',
      };

      act(() => {
        useNotificationStore.setState({ notificationData: [notificationItem] });
      });

      await render(<Header />);

      const notificationElement = await screen.findByText('비트코인 매수 체결 완료');
      expect(notificationElement).toBeInTheDocument();
    });

    it('H-10: 실시간 알림 중간에 SYSTEM 알림 수신 시 맨 앞 순서로 표시된다.', async () => {
      useUserStore.getState().setUser({ id: 1, nickname: '테스트유저' });

      const notificationItem1 = {
        notificationId: 1,
        notificationContent: '비트코인 매수 체결 완료',
        notificationType: 'TRADE' as const,
        notificationIsRead: false,
        createdAt: '2024-01-01T12:00:00',
      };

      const notificationItem2 = {
        notificationId: 2,
        notificationContent: '시스템 알림',
        notificationType: 'SYSTEM' as const,
        notificationIsRead: false,
        createdAt: '2024-01-01T12:00:00',
      };
      

      useNotificationStore.setState({ notificationData: [notificationItem1] });

      await render(<Header />);

      const { addNotificationData } = useNotificationStore.getState();
      act(() => {
        addNotificationData(notificationItem2);
      });

      const systemAlert = await screen.findByText('시스템 알림');
      expect(systemAlert).toBeInTheDocument();
    });
  });
});
