import { useQuery } from '@tanstack/react-query';
import { request } from '@/api/common/axiosInstance';
import { TIntensity } from '@/types/order';

export const getVolumePower = (categoryId: number) => {
  return request<TIntensity>({
    method: 'GET',
    url: `/api/trades/volume-power/${categoryId}`,
  });
};

export const useGetVolumePower = (categoryId: number) => {
  return useQuery({
    queryKey: ['volume-power', categoryId],
    queryFn: () => getVolumePower(categoryId),
  });
};
