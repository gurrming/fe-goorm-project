import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Chart from './Chart';
import Chatting from './chatting/Chatting';
import PriceInfo from './PriceInfo';
import Tab from './Tab';
import { getUpBit, getUpBitMinute } from '../../api/getUpBit';
import { useGetCategoryInfo } from '../../api/useGetCategoryInfo';
import { useChart } from '../../hooks/websocket/useChart';
import { useTicker } from '../../hooks/websocket/useTicker';
import useCategoryIdStore from '../../store/useCategoryId';
import { useChartStore } from '../../store/websocket/useChartStore';

const InfoCoin = () => {
  const [tab, setTab] = useState('price');
  const categoryId = useCategoryIdStore((state) => state.categoryId);
  const { data: categoryInfo } = useGetCategoryInfo(categoryId);
  const TITLE = `${categoryInfo?.categoryName} (${categoryInfo?.symbol}-KRW)`;

  // 웹소켓 구독 시작 (차트 데이터 수신)
  useChart(categoryId);
  useTicker([categoryId]);
  const { chartData } = useChartStore();
  console.log('chartData : ', chartData);

  const handleTab = (tab: string) => {
    setTab(tab);
  };
  const { data: dayData } = useQuery({
    queryKey: ['candles-data-day'],
    queryFn: () => getUpBit('KRW-BTC', 1),
  });
  const { data: minuteData } = useQuery({
    queryKey: ['candles-data-minute'],
    queryFn: () => getUpBitMinute('KRW-BTC', 100),
  });

  return (
    <div className="flex flex-col bg-white">
      <Tab title={TITLE} tab={tab} handleTab={handleTab} />
      {tab === 'price' && dayData && minuteData && (
        <div className="flex flex-col">
          <PriceInfo categoryId={categoryId} quote="KRW" symbol={categoryInfo?.symbol} />
          {chartData && <Chart data={chartData} />}
        </div>
      )}
      {tab === 'community' && <Chatting />}
    </div>
  );
};

export default InfoCoin;
