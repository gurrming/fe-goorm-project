import { useQuery } from '@tanstack/react-query';
import { request } from '@/api/common/axiosInstance';
import { TAnalysis } from '@/types/analysis';

export const getAnalysis = (categoryId: number) => {
  return request<TAnalysis[]>({
    method: 'GET',
    url: `/api/analysis/${categoryId}`,
  });
};

export const useGetAnalysis = (categoryId: number) => {
  return useQuery({
    queryKey: ['analysis', categoryId],
    queryFn: () => getAnalysis(categoryId),
  });
};
