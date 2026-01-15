import { Link, useLocation } from 'react-router-dom';
import { usePostLogout } from '../../api/member/usePostLogout';
import useUserStore from '../../store/useUserStore';
import Button from '../common/Button';

export default function Header() {
  const user = useUserStore((state) => state.user);
  const postLogout = usePostLogout();
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#003597] w-full">
      <div className="flex items-center justify-between px-64 py-3 mx-auto">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="text-white text-2xl font-bold">
              <span className="relative inline-block">HeartBit</span>
            </span>
          </Link>
          <Link
            to="/"
            className={`text-md font-semibold text-nowrap ml-15 ${
              location.pathname === '/' ? 'text-white' : 'text-white/60 hover:text-white'
            }`}
          >
            거래소
          </Link>
          <Link
            to="/asset"
            className={`text-md font-semibold text-nowrap ml-7 ${
              location.pathname === '/asset' ? 'text-white' : 'text-white/60 hover:text-white'
            }`}
          >
            보유자산
          </Link>
        </div>

        <div className="flex items-center gap-8">
          {user ? (
            <>
              <p className="text-white text-sm font-semibold text-nowrap">{user.nickname}님, 환영합니다.</p>
              <Button
                colorType="white"
                onClick={() => {
                  postLogout.mutate();
                }}
              >
                로그아웃
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button colorType="white">로그인</Button>
              </Link>
              <Link to="/signup">
                <Button colorType="blue">회원가입</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
