import { describe, it, expect } from 'vitest';
import { calculateMovingAverageSeriesData } from '../CalculateMovingAverageSeries';
import type { TLightweightChartsData } from '../../../types/upBit';
import type { Time } from 'lightweight-charts';

const createCandle = (time: string | number, close: number): TLightweightChartsData => ({
  time: time as Time,
  close,
  open: 0,
  high: 0,
  low: 0,
});

describe('calculateMovingAverageSeriesData', () => {
  it('데이터가 비어있으면 빈 배열을 반환한다.', () => {
    const result = calculateMovingAverageSeriesData([], 5);
    expect(result).toEqual([]);
  });

  it('데이터 길이가 MA 길이(maLength)보다 짧으면 모든 데이터가 value 없는 whitespace로 반환된다.', () => {
    const data = [createCandle('2023-01-01', 100), createCandle('2023-01-02', 200), createCandle('2023-01-03', 300)];
    const maLength = 5;

    const result = calculateMovingAverageSeriesData(data, maLength);

    expect(result).toHaveLength(3);
    result.forEach((item) => {
      expect(item).toHaveProperty('time');
      expect(item).not.toHaveProperty('value');
    });
  });

  it('데이터 길이가 MA 길이와 같아도, 로직상(i < maLength) 마지막까지 whitespace로 처리된다.', () => {
    const data = [createCandle(1, 10), createCandle(2, 20), createCandle(3, 30)];
    const maLength = 3;

    const result = calculateMovingAverageSeriesData(data, maLength);

    expect(result).toHaveLength(3);
    expect(result[2]).not.toHaveProperty('value');
  });

  it('maLength 이후부터 정확한 이동평균값을 계산하여 반환한다.', () => {
    const data = [
      createCandle(1, 10),
      createCandle(2, 20),
      createCandle(3, 30),
      createCandle(4, 40),
      createCandle(5, 50),
    ];
    const maLength = 3;

    const result = calculateMovingAverageSeriesData(data, maLength);

    expect(result).toHaveLength(5);

    expect(result[0]).not.toHaveProperty('value');
    expect(result[1]).not.toHaveProperty('value');
    expect(result[2]).not.toHaveProperty('value');

    expect(result[3]).toEqual({ time: 4 as Time, value: 30 });

    expect(result[4]).toEqual({ time: 5 as Time, value: 40 });
  });

  it('소수점 계산이 포함된 경우 정확하게 평균을 계산한다.', () => {
    const data = [createCandle(1, 10), createCandle(2, 10), createCandle(3, 10), createCandle(4, 11)];
    const maLength = 3;

    const result = calculateMovingAverageSeriesData(data, maLength);

    const calculatedItem = result[3] as { time: Time; value: number };

    expect(calculatedItem.value).toBeCloseTo(10.3333, 4);
  });
});
