import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import signupSchema from './SignupSchema';
import { usePostSignup } from '../../api/member/usePostSignup';
import Button from '../common/Button';
import type { TSignupForm } from '../../types/member';

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(signupSchema),
    mode: 'onChange',
  });

  const postSignup = usePostSignup();

  const onSubmit = async (data: TSignupForm) => {
    postSignup.mutate(data);
  };

  return (
    <form className="flex flex-col justify-center items-center gap-5 w-[400px]" onSubmit={handleSubmit(onSubmit)}>
      <p className="text-2xl font-bold">회원가입</p>
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
        <input
          type="password"
          className="w-full outline-none rounded-md p-2 bg-white"
          placeholder="비밀번호를 다시 입력해주세요."
          {...register('passwordConfirm')}
        />
        {errors.passwordConfirm && <p className="text-sm text-red-500">{errors.passwordConfirm.message}</p>}
      </div>

      <div className="flex flex-col gap-2 w-full">
        <p className="text-sm font-bold">닉네임</p>
        <input
          type="text"
          className="w-full outline-none rounded-md p-2 bg-white"
          placeholder="닉네임을 입력해주세요."
          {...register('nickname')}
        />
        {errors.nickname && <p className="text-sm text-red-500">{errors.nickname.message}</p>}
      </div>
      <Button colorType="blue" type="submit" disabled={!isValid}>
        회원가입
      </Button>
    </form>
  );
};

export default SignupForm;
