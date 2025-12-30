import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Chart from './Chart';
import Chatting from './chatting/Chatting';
import PriceInfo from './PriceInfo';
import Tab from './Tab';
import getUpBit from '../../api/getUpBit';

const InfoCoin = () => {
  const [tab, setTab] = useState('price');
  const handleTab = (tab: string) => {
    setTab(tab);
  };
  const { data } = useQuery({
    queryKey: ['candles-data-day'],
    queryFn: () => getUpBit('KRW-BTC', 100),
  });

  return (
    <div className="flex flex-col bg-white">
      <Tab title={data?.[0]?.market} tab={tab} handleTab={handleTab} />
      {tab === 'price' && data && (
        <div className="flex flex-col">
          <PriceInfo data={data} />
          <Chart data={data} />
        </div>
      )}
      {tab === 'community' && <Chatting />}
    </div>
  );
};

export default InfoCoin;
