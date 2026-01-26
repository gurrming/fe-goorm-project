import { useInfiniteQuery, type UseInfiniteQueryResult, type InfiniteData } from '@tanstack/react-query';
import { getChart } from '../../api/useGetChart';
import type { ChartData } from '../../types/websocket';

export const useGetInfiniteChart = (
  categoryId: number,
  size: number,
): UseInfiniteQueryResult<InfiniteData<ChartData[], number>, Error> => {
  return useInfiniteQuery<ChartData[], Error, InfiniteData<ChartData[], number>, (string | number)[], number>({
    queryKey: ['chart', categoryId, size],
    queryFn: ({ pageParam = 0 }) => getChart(categoryId, pageParam, size),
    initialPageParam: 0,
    getNextPageParam: (lastPage: ChartData[]) => {
      if (!lastPage || lastPage.length === 0) return undefined;
      return lastPage[lastPage.length - 1].tradeId;
    },
  });
};
