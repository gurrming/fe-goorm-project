import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { request } from './common/axiosInstance';
import type { ChartData, RawChartData } from '../types/websocket';

export const getChart = (categoryId: number, lastId: number, size: number): Promise<ChartData[]> => {
  return request<RawChartData[]>({
    method: 'GET',
    url: `/api/trades/chart?categoryId=${categoryId}&lastId=${lastId}&size=${size}`,
  }).then((res) =>
    res
      .map((item) => {
        const t = typeof item.t === 'number' ? item.t : parseInt(String(item.t), 10);
        const o = typeof item.o === 'number' ? item.o : parseFloat(String(item.o));
        const h = typeof item.h === 'number' ? item.h : parseFloat(String(item.h));
        const l = typeof item.l === 'number' ? item.l : parseFloat(String(item.l));
        const c = typeof item.c === 'number' ? item.c : parseFloat(String(item.c));

        if (
          !Number.isFinite(t) ||
          !Number.isFinite(o) ||
          !Number.isFinite(h) ||
          !Number.isFinite(l) ||
          !Number.isFinite(c)
        ) {
          return undefined;
        }
        return { t, o, h, l, c } as ChartData;
      })
      .filter((item): item is ChartData => Boolean(item)),
  );
};

export const useGetChart = (categoryId: number, lastId: number, size: number): UseQueryResult<ChartData[], Error> => {
  return useQuery<ChartData[], Error>({
    queryKey: ['chart', categoryId],
    queryFn: () => getChart(categoryId, lastId, size),
  });
};
