import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Notification from './Notification';
import { usePostLogout } from '../../api/member/usePostLogout';
import { useNotification } from '../../hooks/websocket/useNotification';
import useUserStore from '../../store/useUserStore';
import { useNotificationStore } from '../../store/websocket/useNotificationStore';
import Button from '../common/Button';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [anchorRect, setAnchorRect] = useState<DOMRectReadOnly | null>(null);
  const user = useUserStore((state) => state.user);
  const { notificationData, popNotification } = useNotificationStore();
  const postLogout = usePostLogout();
  const location = useLocation();

  useNotification(user?.id ?? 0);

  const handleTickerEnd = useCallback(() => {
    popNotification();
  }, [popNotification]);

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setAnchorRect(rect);
    setOpen((prev) => !prev);
  };

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
            to={user ? '/asset' : '/login'}
            className={`text-md font-semibold text-nowrap ml-7 ${
              location.pathname === '/asset' ? 'text-white' : 'text-white/60 hover:text-white'
            }`}
          >
            보유자산
          </Link>
          <Link
            to={'/ai-analysis'}
            className={`text-md font-semibold text-nowrap ml-7 ${
              location.pathname === '/ai-analysis' ? 'text-white' : 'text-white/60 hover:text-white'
            }`}
          >
            AI 분석
          </Link>
        </div>
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
              <FontAwesomeIcon icon={faBell} color="white" size="xl" onClick={handleClick} />
              {open && anchorRect && <Notification anchorRect={anchorRect} width="400px" setOpen={setOpen} />}
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
