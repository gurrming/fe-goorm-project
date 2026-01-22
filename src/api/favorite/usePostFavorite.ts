import { useMutation, useQueryClient } from '@tanstack/react-query';
import { request } from '../common/axiosInstance';
import type { Interest } from './useGetFavorite';
export type CreateInterestRequest = {
  interestId?: number;
  memberId: number;
  categoryId: number;
};

export const postInterest = (data: CreateInterestRequest): Promise<Interest> => {
  return request<Interest>({
    method: 'POST',
    url: '/api/interests',
    data,
  });
};

export const usePostFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postInterest,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['interests', variables.memberId] });
    },
  });
};
