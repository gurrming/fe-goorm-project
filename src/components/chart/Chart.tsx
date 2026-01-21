import { createChart, CandlestickSeries, ColorType, LineSeries } from 'lightweight-charts';
import React, { useRef, useEffect } from 'react';
import { calculateMovingAverageSeriesData } from './CalculateMovingAverageSeries';
import type { ChartData } from '../../types/websocket';
import type { CandlestickData, ISeriesApi, LineData, LogicalRange, Time } from 'lightweight-charts';

const Chart = ({
  data,
  fetchNextPage,
  hasMore,
}: {
  data: ChartData[];
  fetchNextPage: () => void;
  hasMore: boolean;
}) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const ma5SeriesRef = useRef<ISeriesApi<'Line'> | null>(null);
  const ma10SeriesRef = useRef<ISeriesApi<'Line'> | null>(null);

  const isFetching = useRef(false);

  useEffect(() => {
    if (!chartContainerRef.current || !data) return;

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

    const ma5Series = chart.addSeries(LineSeries, { color: '#EC7871', lineWidth: 1 });
    const ma10Series = chart.addSeries(LineSeries, { color: '#48B888', lineWidth: 1 });

    seriesRef.current = candlestickSeries;
    ma5SeriesRef.current = ma5Series;
    ma10SeriesRef.current = ma10Series;

    const handleVisibleLogicalRangeChange = (newVisibleLogicalRange: LogicalRange | null) => {
      if (newVisibleLogicalRange === null) return;

      if (newVisibleLogicalRange.from < 10 && hasMore && !isFetching.current) {
        isFetching.current = true;
        fetchNextPage();
      }
    };
    chart.timeScale().subscribeVisibleLogicalRangeChange(handleVisibleLogicalRangeChange);
    chart.timeScale().fitContent();

    return () => {
      chart.remove();
    };
  }, []);

  useEffect(() => {
    if (!seriesRef.current || !data || data.length === 0) return;

    const uniqueDataMap = new Map();
    data.forEach((item) => {
      const t = typeof item.t === 'number' ? item.t : parseInt(item.t, 10);
      if (Number.isFinite(t) && Number.isFinite(item.c)) {
        uniqueDataMap.set(t, { ...item, t });
      }
    });
    const sortedData = Array.from(uniqueDataMap.values()).sort((a, b) => a.t - b.t);

    const candlestickData: CandlestickData[] = sortedData.map((item) => ({
      time: (item.t / 1000) as Time,
      open: item.o,
      high: item.h,
      low: item.l,
      close: item.c,
    }));

    // 차트 데이터 업데이트
    seriesRef.current.setData(candlestickData);

    // 이동평균선 업데이트
    if (ma5SeriesRef.current && ma10SeriesRef.current) {
      ma5SeriesRef.current.setData(calculateMovingAverageSeriesData(candlestickData, 5) as LineData<Time>[]);
      ma10SeriesRef.current.setData(calculateMovingAverageSeriesData(candlestickData, 10) as LineData<Time>[]);
    }

    // 데이터 로딩이 끝났으므로 페칭 잠금 해제
    isFetching.current = false;
  }, [data]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div ref={chartContainerRef} className="w-full" />
    </div>
  );
};

export default Chart;
