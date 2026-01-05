import { useMutation, useQueryClient } from '@tanstack/react-query';
import { request } from '../common/axiosInstance';

export const deleteInterest = (interestId: number, memberId: number): Promise<void> => {
  return request<void>({
    method: 'DELETE',
    url: `/api/interests/${interestId}`,
    params: {
      memberId,
    },
  });
};

export const useDeleteFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ interestId, memberId }: { interestId: number; memberId: number }) =>
      deleteInterest(interestId, memberId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['interests', variables.memberId] });
    },
  });
};
