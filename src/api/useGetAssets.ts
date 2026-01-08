import { useQuery } from '@tanstack/react-query';
import { TAssets } from '../types/asset';
import { request } from './common/axiosInstance';

export const getAssets = () => {
  return request<TAssets[]>({
    method: 'GET',
    url: '/api/assets',
  });
};

export const useGetAssets = () => {
  return useQuery({
    queryKey: ['assets'],
    queryFn: getAssets,
  });
};
