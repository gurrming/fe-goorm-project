import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Chart from './Chart';
import Chatting from './chatting/Chatting';
import PriceInfo from './PriceInfo';
import Tab from './Tab';
import { getUpBit, getUpBitMinute } from '../../api/getUpBit';

const InfoCoin = () => {
  const [tab, setTab] = useState('price');
  const handleTab = (tab: string) => {
    setTab(tab);
  };
  const { data: dayData } = useQuery({
    queryKey: ['candles-data-day'],
    queryFn: () => getUpBit('KRW-BTC', 100),
  });
  const { data: minuteData } = useQuery({
    queryKey: ['candles-data-minute'],
    queryFn: () => getUpBitMinute('KRW-BTC', 100),
  });

  return (
    <div className="flex flex-col bg-white">
      <Tab title={dayData?.[0]?.market} tab={tab} handleTab={handleTab} />
      {tab === 'price' && dayData && minuteData && (
        <div className="flex flex-col">
          <PriceInfo data={dayData} />
          <Chart data={minuteData} />
        </div>
      )}
      {tab === 'community' && <Chatting />}
    </div>
  );
};

export default InfoCoin;
