import { useMutation, useQueryClient } from '@tanstack/react-query';
import useUserStore from '../../store/useUserStore';
import { request } from '../common/axiosInstance';

const postLogout = () => {
  return request<void>({
    method: 'POST',
    url: '/api/member/logout',
  });
};

export const usePostLogout = () => {
  const queryClient = useQueryClient();
  const logout = useUserStore((state) => state.logout);
  const clearUser = useUserStore.persist.clearStorage;

  return useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      clearUser();
      logout();
    },
  });
};
