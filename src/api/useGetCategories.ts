import { useQuery } from '@tanstack/react-query';
import { request } from './common/axiosInstance';
import type { Category } from '../types/category';

export const getCategories = (): Promise<Category[]> => {
  return request<Category[]>({
    method: 'GET',
    url: '/api/categories',
  });
};

export const useGetCategories = () => {
  return useQuery({
    queryKey: ['marketItems'],
    queryFn: () => getCategories(),
  });
};
