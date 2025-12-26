import { useState } from 'react';
import Asset from './contents/asset/asset';
import Buy from './contents/buy';
import Sell from './contents/sell';
import Transaction from './contents/transaction/transaction';
import Tab from './tab';

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
