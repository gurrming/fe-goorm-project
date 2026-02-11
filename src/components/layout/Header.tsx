import { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import IconSection from './IconSection';
import NavBar from './NavBar';
import { usePostLogout } from '../../api/member/usePostLogout';
import { useNotification } from '../../hooks/websocket/useNotification';
import useUserStore from '../../store/useUserStore';
import { useNotificationStore } from '../../store/websocket/useNotificationStore';
import Button from '../common/Button';

const Header = () => {
  const user = useUserStore((state) => state.user);
  const { notificationData, popNotification } = useNotificationStore();
  const postLogout = usePostLogout();

  useNotification(user?.id ?? 0);

  const handleTickerEnd = useCallback(() => {
    popNotification();
  }, [popNotification]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#003597] w-full">
      <div className="flex items-center justify-between px-64 py-3 mx-auto">
        <NavBar isLoggedIn={!!user} />
        <div className="flex-1 overflow-hidden mx-3 relative">
          {notificationData && notificationData.length > 0 && (
            <div
              key={notificationData[0].notificationId}
              className="whitespace-nowrap notification-marquee text-white text-sm"
              onAnimationEnd={handleTickerEnd}
            >
              {notificationData[0].notificationContent}
            </div>
          )}
        </div>
        <div className="flex items-center gap-8">
          {user ? (
            <>
              <p className="text-white text-sm font-semibold text-nowrap">{user.nickname}님, 환영합니다.</p>
              <IconSection />
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
};

export default memo(Header);
