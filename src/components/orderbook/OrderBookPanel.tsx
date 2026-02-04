import OrderBookContent from './OrderBookContent';
import OrderbookHeader from './OrderbookHeader';
import useCategoryIdStore from '../../store/useCategoryId';

export default function OrderBookPanel() {
  const categoryId = useCategoryIdStore((state) => state.categoryId);

  return (
    <div className="w-[495px] h-[800px] flex flex-col bg-white">
      <OrderbookHeader />
      <OrderBookContent categoryId={categoryId} />
    </div>
  );
}
