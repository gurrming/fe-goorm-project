import * as yup from 'yup';

const loginSchema = yup.object().shape({
  email: yup.string().email('이메일 형식이 올바르지 않습니다.').required('이메일은 필수 입력 사항입니다.'),
  password: yup.string().required('비밀번호는 필수 입력 사항입니다.').min(8, '비밀번호는 8자 이상이어야 합니다.'),
});

export default loginSchema;
