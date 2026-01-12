import { createChart, CandlestickSeries, ColorType, LineSeries } from 'lightweight-charts';
import React, { useRef, useEffect } from 'react';
import { calculateMovingAverageSeriesData } from './CalculateMovingAverageSeries';
import type { ChartData } from '../../types/websocket';
import type { CandlestickData, LineData, Time } from 'lightweight-charts';

const Chart = ({ data }: { data: ChartData[] }) => {
  console.log('Chart 컴포넌트 내의 data : ', data);
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!chartContainerRef.current || !data) return;

    const sortedData = [...data].sort((a: ChartData, b: ChartData) => {
      const aTime = new Date(a.t).getTime();
      const bTime = new Date(b.t).getTime();
      return aTime - bTime;
    });

    const candlestickData: CandlestickData[] = sortedData.map((item: ChartData) => ({
      time: (new Date(item.t).getTime() / 1000) as Time,
      open: item.o,
      high: item.h,
      low: item.l,
      close: item.c,
    }));

    const chartOptions = {
      layout: { textColor: 'black', background: { type: ColorType.Solid, color: 'white' }, fontSize: 10 },
      width: 1000,
      height: 450,
      grid: {
        vertLines: { color: '#f2f2f2', style: 0 },
        horzLines: { color: '#f2f2f2', style: 0 },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        borderColor: '#f2f2f2',
        tickMarkFormatter: (time: Time) => {
          return new Date((time as number) * 1000).toLocaleString('ko-KR', {
            timeZone: 'Asia/Seoul',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          });
        },
      },

      localization: {
        priceFormatter: (price: number) => {
          return price.toLocaleString('ko-KR');
        },

        timeFormatter: (time: Time) => {
          return new Date((time as number) * 1000).toLocaleString('ko-KR', {
            timeZone: 'Asia/Seoul',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          });
        },
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
