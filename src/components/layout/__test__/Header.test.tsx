import { screen } from '@testing-library/react';
import { useLocation } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Header from '../Header';
import render from '@/lib/test/render';
import useUserStore from '@/store/useUserStore';

const { mockMutate } = vi.hoisted(() => ({
  mockMutate: vi.fn(),
}));

vi.mock('@/api/member/usePostLogout', () => ({
  usePostLogout: () => ({
    mutate: mockMutate,
  }),
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
});