import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { useWebsocket } from '../../hooks/useWebsocket';

export default function Layout() {
  const { connect, disconnect } = useWebsocket();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      connect(token).catch((error) => {
        console.error('WebSocket 연결 실패:', error);
      });
    }

    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return (
    <div>
      <Header />
      <div className="flex w-full flex-col items-center px-40 pt-20">
        <Outlet />
      </div>
    </div>
  );
}
