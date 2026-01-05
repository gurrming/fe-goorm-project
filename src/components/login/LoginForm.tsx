import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import loginSchema from './LoginSchema';
import { postLogin } from '../../api/member';
import useUserStore from '../../store/useUserStore';
import Button from '../common/Button';
import type { TLoginForm, TLoginResponse } from '../../types/member';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
  });
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  const { mutate: loginMutation } = useMutation({
    mutationFn: postLogin,
    onSuccess: (data: TLoginResponse) => {
      localStorage.setItem('accessToken', data.accessToken);
      setUser({ id: data.id, nickname: data.nickname });
      navigate('/');
    },
    // onError: (error) => {
    //   console.log(error);
    // },
  });

  const onSubmit = async (data: TLoginForm) => {
    loginMutation(data);
  };

  return (
    <form className="flex flex-col justify-center items-center gap-5 w-[400px]" onSubmit={handleSubmit(onSubmit)}>
      <p className="text-2xl font-bold">로그인</p>
      <div className="flex flex-col gap-2 w-full">
        <p className="text-sm font-bold">이메일</p>
        <input
          type="text"
          className="w-full outline-none rounded-md p-2 bg-white"
          placeholder="이메일을 입력해주세요."
          {...register('email')}
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
      </div>
      <div className="flex flex-col gap-2 w-full">
        <p className="text-sm font-bold">비밀번호</p>
        <input
          type="password"
          className="w-full outline-none rounded-md p-2 bg-white"
          placeholder="비밀번호를 입력해주세요."
          {...register('password')}
        />
        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
      </div>
      <Button colorType="blue" type="submit" disabled={!isValid}>
        로그인
      </Button>
    </form>
  );
};

export default LoginForm;
