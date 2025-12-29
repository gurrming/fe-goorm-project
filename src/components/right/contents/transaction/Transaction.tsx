import { useState } from 'react';
import Settled from './Settled';
import UnSettled from './unSettled';

const Transaction = () => {
  const [settled, setSettled] = useState(true);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-2">
        <input type="radio" name="transaction" id="unsettled" checked={!settled} onChange={() => setSettled(false)} />
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
  );
};

export default Transaction;
