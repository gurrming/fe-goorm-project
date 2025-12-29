import { useState } from 'react';
import Asset from './contents/asset/Asset';
import Buy from './contents/Buy';
import Sell from './contents/Sell';
import Transaction from './contents/transaction/Transaction';
import Tab from './Tab';

const Right = () => {
  const [tab, setTab] = useState('buy');
  const handleTab = (tab: string) => {
    setTab(tab);
  };

  return (
    <div className="w-[550px] bg-white p-4 flex flex-col gap-4">
      <Tab handleTab={handleTab} tab={tab} />
      {tab === 'buy' && <Buy />}
      {tab === 'sell' && <Sell />}
      {tab === 'asset' && <Asset />}
      {tab === 'transaction' && <Transaction />}
    </div>
  );
};

export default Right;
