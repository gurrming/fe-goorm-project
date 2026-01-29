import { useQuery } from '@tanstack/react-query';
import { request } from './common/axiosInstance';
import type { Category } from '../types/category';

const getCategoryInfo = (categoryId: number) => {
  return request<Category>({
    method: 'GET',
    url: `/api/category?categoryId=${categoryId}`,
  });
};

export const useGetCategoryInfo = (categoryId: number) => {
  return useQuery({
    queryKey: ['categoryInfo', categoryId],
    queryFn: () => getCategoryInfo(categoryId),
  });
};
