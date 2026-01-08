import CanvasJSReact from '@canvasjs/react-stockcharts';
import React from 'react';
import { calculateMovingAverageSeriesData } from '../CalculateMovingAverageSeries';
import type { TMinuteData } from '../../../types/upBit';
import type { Time } from 'lightweight-charts';

const CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

const CanvasChart = ({ data }: { data: TMinuteData[] }) => {
  const sortedData =
    [...(data || [])].sort((a: TMinuteData, b: TMinuteData) => {
      const aTime = new Date(a.candle_date_time_kst).getTime();
      const bTime = new Date(b.candle_date_time_kst).getTime();
      return aTime - bTime;
    }) || [];

  if (!sortedData) return;
  const dps1: { x: Date; y: number[] }[] = [];

  for (let i = 0; i < sortedData.length; i++) {
    dps1.push({
      x: new Date(sortedData[i].candle_date_time_kst),
      y: [
        Number(sortedData[i].opening_price),
        Number(sortedData[i].high_price),
        Number(sortedData[i].low_price),
        Number(sortedData[i].trade_price),
      ],
    });
  }
  const ma5DataRaw = calculateMovingAverageSeriesData(
    dps1.map((item) => ({
      time: new Date(item.x).getTime() as Time,
      open: item.y[0],
      high: item.y[1],
      low: item.y[2],
      close: item.y[3],
    })),
    5,
  );
  const ma10DataRaw = calculateMovingAverageSeriesData(
    dps1.map((item) => ({
      time: new Date(item.x).getTime() as Time,
      open: item.y[0],
      high: item.y[1],
      low: item.y[2],
      close: item.y[3],
    })),
    10,
  );

  // CanvasJS Stock Chart 형식으로 변환: { x: Date, y: number }
  const ma5Data = ma5DataRaw
    .filter((item) => 'value' in item && item.value !== undefined)
    .map((item) => ({
      x: new Date(item.time as number),
      y: (item as { time: Time; value: number }).value,
    }));

  const ma10Data = ma10DataRaw
    .filter((item) => 'value' in item && item.value !== undefined)
    .map((item) => ({
      x: new Date(item.time as number),
      y: (item as { time: Time; value: number }).value,
    }));

  const options = {
    theme: 'light1',

    charts: [
      {
        axisX: {
          lineThickness: 0,
          tickLength: 0,

          crosshair: {
            enabled: true,
            snapToDataPoint: true,
            thickness: 0.5,
          },
          gridThickness: 0.1,
          labelFontSize: 10,
        },
        axisY: {
          lineThickness: 0.5,
          tickLength: 0,
          includeZero: false,
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
            thickness: 0.5,
          },
          gridThickness: 0.1,
          labelFontSize: 10,
        },

        toolTip: {
          shared: false,
        },
        dataPointWidth: 4,
        data: [
          {
            yValueFormatString: '#,###.##원',
            type: 'candlestick',
            risingColor: '#DD3C44',
            fallingColor: '#0062DF',

            dataPoints: dps1,
          },
          {
            name: 'MA5',
            yValueFormatString: '#,###.##원',
            type: 'line',
            color: '#EC7871',
            dataPoints: ma5Data,
            lineThickness: 1,
          },
          {
            name: 'MA10',
            yValueFormatString: '#,###.##원',
            type: 'line',
            color: '#48B888',
            dataPoints: ma10Data,
            lineThickness: 1,
          },
        ],
      },
    ],
    navigator: {
      enabled: false,
    },
    rangeSelector: {
      enabled: false,
    },
  };
  const containerProps = {
    width: '1000px',
    height: '450px',
    margin: 'auto',
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <CanvasJSStockChart containerProps={containerProps} options={options} />
    </div>
  );
};

export default CanvasChart;
