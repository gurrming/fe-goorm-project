import { useState } from 'react';
import Asset from './contents/asset/Asset';
import OrderForm from './contents/order/OrderForm';
import Transaction from './contents/transaction/Transaction';
import Tab from './Tab';

const Right = () => {
  const [tab, setTab] = useState('buy');
  const handleTab = (tab: string) => {
    setTab(tab);
  };

  const handleOrder = (price: string, quantity: string, totalAmount: number) => {
    // 추후 주문 시 로직 추가해야됨
    console.log({ price, quantity, totalAmount, orderType: tab });
  };

  return (
    <div className="w-1/2 h-full bg-white flex flex-col gap-4">
      <Tab handleTab={handleTab} tab={tab} />
      {tab === 'buy' && <OrderForm orderType="buy" onOrder={handleOrder} />}
      {tab === 'sell' && <OrderForm orderType="sell" onOrder={handleOrder} />}
      {tab === 'asset' && <Asset />}
      {tab === 'transaction' && <Transaction />}
    </div>
  );
};

export default Right;
