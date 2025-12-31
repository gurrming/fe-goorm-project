import { mockSellOrderInitial } from './mockData';
import OrderForm from './OrderForm';

const Sell = () => {
  const handleSell = () => {
    // 추후 매도 시 로직 추가 예정
  };

  return <OrderForm orderType="sell" initialData={mockSellOrderInitial} onOrder={handleSell} />;
};

export default Sell;
