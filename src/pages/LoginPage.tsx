import { Link } from 'react-router-dom';
import LoginForm from '../components/login/loginForm';

export default function LoginPage() {
  return (
    <div className="w-[600px] flex flex-col justify-center items-center mt-20 gap-5">
      <LoginForm />
      <div className="flex items-center gap-2">
        <p className="text-sm text-gray-500">아직 회원이 아니신가요?</p>
        <Link to="/signup" className="text-[14px] text-primary-900 hover:underline hover:cursor-pointer">
          회원가입
        </Link>
      </div>
    </div>
  );
}
