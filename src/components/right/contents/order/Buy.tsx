import { mockBuyOrderInitial } from './mockData';
import OrderForm from './OrderForm';

const Buy = () => {
  const handleBuy = () => {
    // 추후 매수 주문 시 로직 추가
  };

  return <OrderForm orderType="buy" initialData={mockBuyOrderInitial} onOrder={handleBuy} />;
};

export default Buy;
