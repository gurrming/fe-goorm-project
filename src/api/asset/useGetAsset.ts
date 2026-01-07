import { useQuery } from '@tanstack/react-query';
import useUserStore from '../../store/useUserStore';
import { request } from '../common/axiosInstance';
import type { TMyAsset } from '../../types/asset';

export const getMyAsset = (): Promise<TMyAsset> => {
  return request<TMyAsset>({
    method: 'GET',
    url: '/api/assets',
  });
};

export const useGetMyAsset = () => {
  const user = useUserStore((state) => state.user);
  const isLoggedIn = !!user;

  return useQuery({
    queryKey: ['myAsset'],
    queryFn: getMyAsset,
    enabled: isLoggedIn,
  });
};
