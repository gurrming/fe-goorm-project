import React from 'react';
import InfoCoin from '../components/chart/InfoCoin';
import MarketPanel from '../components/market/MarketPanel';
import OrderBookPanel from '../components/orderbook/OrderBookPanel';
import Right from '../components/right/Right';

export default function MainPage() {
  return (
    <div className="flex justify-center gap-2">
      <div className="flex flex-col gap-2">
        <InfoCoin />
        <div className="flex justify-center gap-2">
          <OrderBookPanel />
          <Right />
        </div>
      </div>

      <MarketPanel />
    </div>
  );
}
