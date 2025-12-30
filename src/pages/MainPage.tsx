import React from 'react';
import InfoCoin from '../components/chart/InfoCoin';
import Right from '../components/right/Right';
export default function MainPage() {
  return (
    <div className="flex justify-center items-center gap-10">
      <InfoCoin />
      <Right />
    </div>
  );
}
