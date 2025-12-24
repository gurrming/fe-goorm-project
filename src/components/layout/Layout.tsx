import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function Layout() {
  return (
    <div>
      <Header />
      <div className="flex w-full flex-col items-center px-40">
        <Outlet />
      </div>
    </div>
  );
}
