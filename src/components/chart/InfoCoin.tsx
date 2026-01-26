import { useMemo, useState } from 'react';
import { calculateMergedData } from './calculateMergedData';
import Chart from './Chart';
import Chatting from './chatting/Chatting';
import PriceInfo from './PriceInfo';
import Tab from './Tab';
import { useGetCategoryInfo } from '../../api/useGetCategoryInfo';
import { useGetInfiniteChart } from '../../hooks/infinite/useGetInfiniteChart';
import { useChart } from '../../hooks/websocket/useChart';
import { useTicker } from '../../hooks/websocket/useTicker';
import useCategoryIdStore from '../../store/useCategoryId';
import { useChartStore } from '../../store/websocket/useChartStore';
import type { ChartData } from '../../types/websocket';

const InfoCoin = () => {
  const [tab, setTab] = useState('price');
  const categoryId = useCategoryIdStore((state) => state.categoryId);
  const { data: categoryInfo } = useGetCategoryInfo(categoryId);
  const TITLE = `${categoryInfo?.categoryName} (${categoryInfo?.symbol}-KRW)`;

  // 웹소켓 구독 시작 (차트 데이터 수신)
  useChart(categoryId);
  useTicker([categoryId]);

  const handleTab = (tab: string) => {
    setTab(tab);
  };

  const realtimeData = useChartStore((state) => state.chartDataList);
  const { data: infiniteData, fetchNextPage, hasNextPage } = useGetInfiniteChart(categoryId, 300);

  const mergedData = useMemo(() => {
    return calculateMergedData<ChartData>(infiniteData, realtimeData, data => data.t,(a, b) => a.t - b.t);
  }, [infiniteData, realtimeData]);

  return (
    <div className="flex flex-col bg-white">
      <Tab title={TITLE} tab={tab} handleTab={handleTab} />
      {tab === 'price' && (
        <div className="flex flex-col">
          <PriceInfo categoryId={categoryId} quote="KRW" symbol={categoryInfo?.symbol} />
          {mergedData && mergedData.length > 0 ? (
            <Chart data={mergedData} fetchNextPage={fetchNextPage} hasMore={hasNextPage} />
          ) : (
            <div className="flex justify-center items-center h-[450px]">
              <p className="text-center text-gray-500">차트 데이터가 없습니다.</p>
            </div>
          )}
        </div>
      )}
      {tab === 'community' && <Chatting />}
    </div>
  );
};

export default InfoCoin;
