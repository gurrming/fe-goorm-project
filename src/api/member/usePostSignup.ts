import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { request } from '../common/axiosInstance';
import type { TSignupForm } from '../../types/member';

const postSignup = (data: TSignupForm) => {
  return request<TSignupForm>({
    method: 'POST',
    url: '/api/member/signup',
    data: {
      email: data.email,
      password: data.password,
      nickname: data.nickname,
    },
  });
};

export const usePostSignup = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: postSignup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      navigate('/login');
    },
  });
};
