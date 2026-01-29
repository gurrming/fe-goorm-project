import { renderHook } from '@testing-library/react';
import { mockUseUserStore } from '../../../lib/test/mockZustandStore';
import { IsMe } from '../chatting/IsMe';

describe('IsMe', () => {
  beforeEach(() => {
    mockUseUserStore({ user: { id: 1, nickname: 'test' } });
  });
  it('채팅 메세지가 자신이 보낸 메세지라면 true를 반환한다.', () => {
    const { result } = renderHook(() => IsMe({ userId: 1 }));
    expect(result.current).toBe(true);
  });
  it('채팅 메세지가 자신이 보낸 메세지가 아니라면 false를 반환한다.', () => {
    const { result } = renderHook(() => IsMe({ userId: 2 }));
    expect(result.current).toBe(false);
  });
});
