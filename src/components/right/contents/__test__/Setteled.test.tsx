import { screen } from '@testing-library/react';
import { Mock, vi } from 'vitest';
import Settled from '../transaction/Settled';
import { useGetInfiniteSettled } from '@/hooks/infinite/useGetInfiniteSettled';
import { mockUseUserStore } from '@/lib/test/mockZustandStore';
import render from '@/lib/test/render';

vi.mock('@/hooks/infinite/useGetInfiniteSettled', () => ({
  useGetInfiniteSettled: vi.fn(),
}));

describe('<Settled /> 통합 테스트', () => {
  beforeEach(() => {
    mockUseUserStore({ user: { id: 1, nickname: 'test' } });
    (useGetInfiniteSettled as Mock).mockReturnValue({
      data: { pages: [] },
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isFetching: false,
    });
  });
  it('TL-08: 체결 내역이 없는 경우 표시', async () => {
    (useGetInfiniteSettled as Mock).mockReturnValue({
      data: {
        pages: [],
      },
      fetchNextPage: vi.fn(),
      hasNextPage: false,
    });
    await render(<Settled />);
    expect(screen.getByText('채결 내역이 없습니다.')).toBeInTheDocument();
  });
});
