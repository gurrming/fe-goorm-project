import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import { useWebsocket } from '../../hooks/useWebsocket';
import MarketPanel from '../market/MarketPanel';

export default function Layout() {
  const { connect, disconnect } = useWebsocket();

  useEffect(() => {
    connect().catch((error) => {
      console.error('WebSocket 연결 실패:', error);
    });

    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  const location = useLocation();

  const hiddenMarketPanel = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div>
      <Header />
      <div className="flex w-full justify-center px-40 pt-20 gap-2">
        <Outlet />
        <div className="sticky top-20 self-start">{!hiddenMarketPanel && <MarketPanel />}</div>
      </div>
    </div>
  );
}
