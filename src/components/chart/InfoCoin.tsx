import { memo, useCallback, useState } from 'react';
import ChartDataWrapper from './ChartDataWrapper';
import ChattingCache from './chatting/ChattingCache';
import PriceInfo from './PriceInfo';
import Tab from './Tab';
import { useGetCategoryInfo } from '../../api/useGetCategoryInfo';
import { useChart } from '../../hooks/websocket/useChart';
import { useTicker } from '../../hooks/websocket/useTicker';
import useCategoryIdStore from '../../store/useCategoryId';

const InfoCoin = () => {
  const [tab, setTab] = useState('price');
  const categoryId = useCategoryIdStore((state) => state.categoryId);
  const { data: categoryInfo } = useGetCategoryInfo(categoryId);
  const TITLE = `${categoryInfo?.categoryName} (${categoryInfo?.symbol}-KRW)`;

  useChart(categoryId);
  useTicker([categoryId]);

  const handleTab = useCallback((tab: string) => {
    setTab(tab);
  }, []);

  return (
    <div className="flex flex-col bg-white">
      <Tab title={TITLE} tab={tab} handleTab={handleTab} />
      {tab === 'price' && (
        <div className="flex flex-col">
          <PriceInfo categoryId={categoryId} quote="KRW" symbol={categoryInfo?.symbol} />
          <ChartDataWrapper categoryId={categoryId} />
        </div>
      )}
      {tab === 'community' && <ChattingCache />}
    </div>
  );
};

export default memo(InfoCoin);
