import { useQuery } from '@tanstack/react-query';
import useUserStore from '../../store/useUserStore';
import { request } from '../common/axiosInstance';
import type { TMyAsset } from '../../types/asset';

const getMyAsset = (memberId: number): Promise<TMyAsset> => {
  return request<TMyAsset>({
    method: 'GET',
    url: `/api/assets?memberId=${memberId}`,
  });
};

export const useGetMyAsset = () => {
  const user = useUserStore((state) => state.user);
  const memberId = user?.id;
  const isLoggedIn = !!memberId;

  return useQuery({
    queryKey: ['myAsset', memberId],
    // enabled 가 false 일 때는 실행되지 않으므로 non-null 단언을 사용합니다.
    queryFn: () => getMyAsset(memberId!),
    enabled: isLoggedIn,
  });
};
