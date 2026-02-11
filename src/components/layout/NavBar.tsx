import { memo } from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavBar = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const getLinkStyle = ({ isActive }: { isActive: boolean }) =>
    `text-md font-semibold text-nowrap ml-7 ${isActive ? 'text-white' : 'text-white/60 hover:text-white'}`;

  return (
    <div className="flex items-center">
      <Link to="/" className="flex items-center">
        <span className="text-white text-2xl font-bold">
          <span className="relative inline-block">HeartBit</span>
        </span>
      </Link>
      <NavLink to="/" className={getLinkStyle}>
        거래소
      </NavLink>
      <NavLink to={isLoggedIn ? '/asset' : '/login'} className={getLinkStyle}>
        보유자산
      </NavLink>
      <NavLink to="/ai-analysis" className={getLinkStyle}>
        AI 분석
      </NavLink>
    </div>
  );
};

export default memo(NavBar);
