import { createChart, CandlestickSeries, ColorType, LineSeries } from 'lightweight-charts';
import { mockData } from './mockData';
import type { Time } from 'lightweight-charts';
// eslint-disable-next-line import/order
import { useRef, useEffect } from 'react';

type TData = {
  open: number;
  high: number;
  low: number;
  close: number;
  time: Time;
};
function calculateMovingAverageSeriesData(candleData: TData[], maLength: number) {
  const maData = [];

  for (let i = 0; i < candleData.length; i++) {
    if (i < maLength) {
      maData.push({ time: candleData[i].time });
    } else {
      let sum = 0;
      for (let j = 0; j < maLength; j++) {
        sum += candleData[i - j].close;
      }
      const maValue = sum / maLength;
      maData.push({ time: candleData[i].time, value: maValue });
    }
  }

  return maData;
}

const Chart = () => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!chartContainerRef.current) return;
    const chartOptions = {
      layout: { textColor: 'black', background: { type: ColorType.Solid, color: 'white' } },
      width: 500,
      height: 300,
      grid: {
        vertLines: { color: '#f2f2f2', style: 0 },
        horzLines: { color: '#f2f2f2', style: 0 },
      },
    };
    const chart = createChart(chartContainerRef.current, chartOptions);

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#DD3C44',
      downColor: '#0062DF',
      borderVisible: false,
      wickUpColor: '#DD3C44',
      wickDownColor: '#0062DF',
    });

    const ma5Data = calculateMovingAverageSeriesData(mockData, 5);
    const ma10Data = calculateMovingAverageSeriesData(mockData, 10);

    const ma5Series = chart.addSeries(LineSeries, { color: '#EC7871', lineWidth: 1 });
    const ma10Series = chart.addSeries(LineSeries, { color: '#48B888', lineWidth: 1 });

    ma5Series.setData(ma5Data);
    ma10Series.setData(ma10Data);
    candlestickSeries.setData(mockData);

    chart.timeScale().fitContent();

    return () => {
      chart.remove();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1>1. lightweight-charts</h1>
      <div ref={chartContainerRef} className="w-full" />
    </div>
  );
};

export default Chart;
