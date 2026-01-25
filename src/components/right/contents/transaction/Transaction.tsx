import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Settled from './Settled';
import UnSettled from './UnSettled';
import useUserStore from '../../../../store/useUserStore';

const Transaction = () => {
  const [settled, setSettled] = useState(true);
  const { user } = useUserStore();
  const navigate = useNavigate();
  return (
    <div className="min-w-[500px] h-1/4">
      {user !== null ? (
        <div className="flex flex-col gap-5">
          <div className="flex gap-2 px-4">
            <input
              type="radio"
              name="transaction"
              id="unsettled"
              checked={!settled}
              onChange={() => setSettled(false)}
            />
            <label htmlFor="unsettled" className="text-sm text-[#333333]">
              미체결
            </label>
            <input type="radio" name="transaction" id="settled" checked={settled} onChange={() => setSettled(true)} />
            <label htmlFor="settled" className="text-sm text-[#333333]">
              체결
            </label>
          </div>
          <div className="overflow-x-auto">{settled ? <Settled /> : <UnSettled />}</div>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-2 h-full px-4 ">
            <p className="flex-1 text-sm text-gray-500 text-center py-40">로그인 후 확인할 수 있습니다.</p>
            <div className="flex gap-2">
              <button
                onClick={() => navigate('/signup')}
                className="flex flex-1 px-4 py-2 text-white bg-blue-800 rounded-[2px] text-[13px] items-center justify-center cursor-pointer"
              >
                <span>회원가입</span>
              </button>
              <button
                onClick={() => navigate('/login')}
                className="flex flex-4 w-full px-4 py-2 text-white bg-blue-500 rounded-[2px] text-[13px] items-center justify-center cursor-pointer"
              >
                <span>로그인</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Transaction;
