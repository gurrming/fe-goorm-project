import * as yup from 'yup';

const signupSchema = yup.object().shape({
  email: yup.string().email('이메일 형식이 올바르지 않습니다.').required('이메일은 필수 입력 사항입니다.'),
  emailExist: yup
    .boolean()
    .nullable()
    .test('is-checked', '이메일 중복 확인을 해주세요.', (value) => value !== null && value !== undefined)
    .oneOf([false], '이미 사용 중인 이메일 입니다.'),
  password: yup.string().min(8, '비밀번호는 8자 이상이어야 합니다.').required('비밀번호는 필수 입력 사항입니다.'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다.')
    .required('비밀번호 확인은 필수 입력 사항입니다.'),
  nickname: yup.string().required('닉네임은 필수 입력 사항입니다.'),
});

export default signupSchema;
