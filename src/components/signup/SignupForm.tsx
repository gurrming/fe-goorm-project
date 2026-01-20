import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import signupSchema from './SignupSchema';
import { usePostExists } from '../../api/member/usePostExists';
import { usePostSignup } from '../../api/member/usePostSignup';
import Button from '../common/Button';
import type { TSignupForm } from '../../types/member';

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    trigger,
  } = useForm({
    resolver: yupResolver(signupSchema),
    mode: 'onChange',
    defaultValues: {
      emailExist: null,
      email: '',
      password: '',
      passwordConfirm: '',
      nickname: '',
    },
  });

  const postSignup = usePostSignup();
  const postExists = usePostExists(watch('email'));
  const emailExistStatus = watch('emailExist');

  const onSubmit = async (data: TSignupForm) => {
    postSignup.mutate(data);
  };

  const handleEmailExist = async () => {
    const isEmailValid = await trigger('email');
    if (!isEmailValid) return;
    try {
      const result = await postExists.mutateAsync();
      setValue('emailExist', !!result.isExists, { shouldValidate: true });
    } catch (error) {
      console.error('이메일 중복 확인 중 오류가 발생했습니다:', error);
    }
  };

  return (
    <form className="flex flex-col justify-center items-center gap-5 w-[400px]" onSubmit={handleSubmit(onSubmit)}>
      <p className="text-2xl font-bold">회원가입</p>
      <div className="flex flex-col gap-2 w-full relative">
        <p className="text-sm font-bold">이메일</p>
        <input
          type="text"
          className="w-full outline-none rounded-md p-2 bg-white"
          placeholder="이메일을 입력해주세요."
          {...register('email', {
            onChange: () => setValue('emailExist', null, { shouldValidate: true }),
          })}
        />
        <button
          type="button"
          className="absolute right-[-80px] top-[31px] text-sm bg-gray-500 text-white rounded-md px-2 py-1 cursor-pointer hover:bg-gray-800 border border-gray-300"
          onClick={() => handleEmailExist()}
        >
          중복 확인
        </button>
        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        {errors.emailExist ? (
          <p className="text-sm text-red-500">{errors.emailExist.message}</p>
        ) : (
          !errors.email &&
          !errors.emailExist &&
          emailExistStatus === false && <p className="text-sm text-green-500">사용 가능한 이메일입니다.</p>
        )}
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
