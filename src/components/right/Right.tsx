import { useState } from 'react';
import Asset from './contents/asset/Asset';
import Buy from './contents/order/Buy';
import Sell from './contents/order/Sell';
import Transaction from './contents/transaction/Transaction';
import Tab from './Tab';

const Right = () => {
  const [tab, setTab] = useState('buy');
  const handleTab = (tab: string) => {
    setTab(tab);
  };

  return (
    <div className="w-1/2 h-full bg-white flex flex-col gap-4">
      <Tab handleTab={handleTab} tab={tab} />
      {tab === 'buy' && <Buy />}
      {tab === 'sell' && <Sell />}
      {tab === 'asset' && <Asset />}
      {tab === 'transaction' && <Transaction />}
    </div>
  );
};

export default Right;
