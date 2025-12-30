import { createChart, CandlestickSeries, ColorType, LineSeries } from 'lightweight-charts';
import React, { useRef, useEffect } from 'react';
import { calculateMovingAverageSeriesData } from './CalculateMovingAverageSeries';
import type { TDayData } from '../../types/upBit';
import type { CandlestickData, LineData, Time } from 'lightweight-charts';

const Chart = ({ data }: { data: TDayData[] }) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!chartContainerRef.current || !data) return;

    const sortedData = [...data].sort((a: TDayData, b: TDayData) => a.timestamp - b.timestamp);

    const candlestickData: CandlestickData[] = sortedData.map((item: TDayData) => ({
      time: item.candle_date_time_kst.split('T')[0],
      open: item.opening_price,
      high: item.high_price,
      low: item.low_price,
      close: item.trade_price,
    }));

    console.log('sortedData', sortedData);

    console.log('candlestickData', candlestickData);

    const chartOptions = {
      layout: { textColor: 'black', background: { type: ColorType.Solid, color: 'white' }, fontSize: 10 },
      width: 1000,
      height: 450,
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

    const ma5Data = calculateMovingAverageSeriesData(candlestickData, 5);
    const ma10Data = calculateMovingAverageSeriesData(candlestickData, 10);

    const ma5Series = chart.addSeries(LineSeries, { color: '#EC7871', lineWidth: 1 });
    const ma10Series = chart.addSeries(LineSeries, { color: '#48B888', lineWidth: 1 });

    ma5Series.setData(ma5Data as LineData<Time>[]);
    ma10Series.setData(ma10Data as LineData<Time>[]);
    candlestickSeries.setData(candlestickData);

    chart.timeScale().fitContent();

    return () => {
      chart.remove();
    };
  }, [data]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div ref={chartContainerRef} className="w-full" />
    </div>
  );
};

export default Chart;
