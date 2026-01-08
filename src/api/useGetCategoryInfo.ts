import { useQuery } from '@tanstack/react-query';
import { request } from './common/axiosInstance';
import type { Category } from '../types/category';

const getCategoryInfo = (categoryId: number): Promise<Category> => {
  return request<Category>({
    method: 'GET',
    url: `/api/invest/category/${categoryId}`,
  });
};

export const useGetCategoryInfo = (categoryId: number) => {
  return useQuery({
    queryKey: ['categoryInfo', categoryId],
    queryFn: () => getCategoryInfo(categoryId),
  });
};
