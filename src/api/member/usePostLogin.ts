import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../store/useUserStore';
import { request } from '../common/axiosInstance';
import type { TLoginForm, TLoginResponse, TLoginErrorResponse } from '../../types/member';

const postLogin = (data: TLoginForm) => {
  return request<TLoginResponse>({
    method: 'POST',
    url: '/api/member/login',
    data,
  });
};

export const usePostLogin = () => {
  const queryClient = useQueryClient();
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: postLogin,
    onSuccess: (data: TLoginResponse) => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      localStorage.setItem('accessToken', data.result.accessToken);
      setUser({ id: data.result.memberId, nickname: data.result.memberNickname });
      navigate('/');
    },
    onError: (error: TLoginErrorResponse) => {
      alert(error.response.data.message);
    },
  });
};
