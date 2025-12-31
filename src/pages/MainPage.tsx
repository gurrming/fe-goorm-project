import React from 'react';
import InfoCoin_test from '../components/chart/CanvasChart/InfoCoin_test';
import InfoCoin from '../components/chart/InfoCoin';
export default function MainPage() {
  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <InfoCoin />
      <InfoCoin_test />
    </div>
  );
}
