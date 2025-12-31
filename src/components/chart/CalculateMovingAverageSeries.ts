import type { TLightweightChartsData } from '../../types/upBit';
import type { Time } from 'lightweight-charts';

export function calculateMovingAverageSeriesData(candleData: TLightweightChartsData[], maLength: number) {
  const maData: Array<{ time: Time } | { time: Time; value: number }> = [];

  for (let i = 0; i < candleData.length; i++) {
    if (i < maLength) {
      // Provide whitespace data points until the MA can be calculated
      maData.push({ time: candleData[i].time as Time });
    } else {
      // Calculate the moving average, slow but simple way
      let sum = 0;
      for (let j = 0; j < maLength; j++) {
        sum += candleData[i - j].close;
      }
      const maValue = sum / maLength;
      maData.push({ time: candleData[i].time as Time, value: maValue });
    }
  }

  return maData;
}
