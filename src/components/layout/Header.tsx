import { Link } from 'react-router-dom';
import { usePostLogout } from '../../api/member/usePostLogout';
import useUserStore from '../../store/useUserStore';
import Button from '../common/Button';

export default function Header() {
  const user = useUserStore((state) => state.user);
  const postLogout = usePostLogout();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0C3887] w-full">
      <div className="flex items-center justify-between px-10 py-3 mx-auto">
        <Link to="/" className="flex items-center">
          <span className="text-white text-2xl font-bold">
            <span className="relative inline-block">HeartBit</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
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
