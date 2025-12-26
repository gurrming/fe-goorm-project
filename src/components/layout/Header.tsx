import { Link } from 'react-router-dom';
import Button from '../common/Button';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0C3887] w-full">
      <div className="flex items-center justify-between px-10 py-3 mx-auto">
        <Link to="/" className="flex items-center">
          <span className="text-white text-2xl font-bold">
            <span className="relative inline-block">UPbit</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button colorType="white">로그인</Button>
          </Link>
          <Link to="/signup">
            <Button colorType="blue">회원가입</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
