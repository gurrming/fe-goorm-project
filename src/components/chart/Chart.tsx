import { createChart, CandlestickSeries, ColorType, LineSeries } from 'lightweight-charts';
import React, { useRef, useEffect } from 'react';
import { calculateMovingAverageSeriesData } from './CalculateMovingAverageSeries';
import type { ChartData } from '../../types/websocket';
import type { CandlestickData, LineData, Time } from 'lightweight-charts';

const Chart = ({ data }: { data: ChartData[] }) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!chartContainerRef.current || !data) return;

    const sortedData = [...data]
      .filter((item: ChartData) => {
        // 유효한 시간 값인지 확인
        const time = typeof item.t === 'number' ? item.t : new Date(item.t).getTime();
        return Number.isFinite(time);
      })
      .sort((a: ChartData, b: ChartData) => {
        const aTime = typeof a.t === 'number' ? a.t : new Date(a.t).getTime();
        const bTime = typeof b.t === 'number' ? b.t : new Date(b.t).getTime();
        return aTime - bTime;
      });

    const candlestickData: CandlestickData[] = sortedData
      .filter((item: ChartData) => {
        // 유효한 숫자인지 확인
        const time = typeof item.t === 'number' ? item.t : new Date(item.t).getTime();
        return (
          Number.isFinite(time) &&
          Number.isFinite(item.o) &&
          Number.isFinite(item.h) &&
          Number.isFinite(item.l) &&
          Number.isFinite(item.c)
        );
      })
      .map((item: ChartData) => {
        const time = typeof item.t === 'number' ? item.t : new Date(item.t).getTime();
        return {
          time: (time / 1000) as Time,
          open: item.o,
          high: item.h,
          low: item.l,
          close: item.c,
        };
      });

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
