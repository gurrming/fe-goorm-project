import { useMutation, useQueryClient } from '@tanstack/react-query';
import { request } from '../common/axiosInstance';
import type { TExistsResponse } from '../../types/member';

const postExists = (email: string) => {
  return request<TExistsResponse>({
    method: 'POST',
    url: '/api/member/exists',
    data: { email: email },
  });
};

export const usePostExists = (email: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => postExists(email),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};
