import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Header from '../Header';
import render from '@/lib/test/render';

// 헤더의 로고를 클릭하면 / 로 이동한다.
describe('Header', () => {
  it('H-1: HeartBit 텍스트를 클릭하면 거래소 경로로 ("/") 이동', async () => {
    await render(<Header />);

    const logoLink = screen.getByText('HeartBit').closest('a');
    expect(logoLink).toHaveAttribute('href', '/');
  });
  it("H-2: 로그인 버튼 클릭시 /login 경로로 이동",()=>{})
  it("H-3: 회원가입 버튼 클릭시 /signup 경로로 이동",()=>{})

  it('H-4: 로그아웃 버튼 클릭시 로그아웃 처리', async () => {
    // usePostLogout mock 설정
    const mockMutate = vi.fn();
    vi.mock('@/api/member/usePostLogout', () => ({
      usePostLogout: () => ({
        mutate: mockMutate,
      }),
    }));

    // 사용자 로그인 상태로 설정
    const userStore = (await import('@/store/useUserStore')).default;
    userStore.getState().setUser({ id: 1, nickname: '테스트유저' });

    const { user } = await render(<Header />);

    // 로그아웃 버튼 찾기 및 클릭
    const logoutButton = screen.getByText('로그아웃');
    await user.click(logoutButton);
  
    // mutate가 호출되었는지 확인
    expect(mockMutate).toHaveBeenCalledTimes(1);
  });

  it("거래소 버튼 클",()=>{})

  it("",()=>{})


})