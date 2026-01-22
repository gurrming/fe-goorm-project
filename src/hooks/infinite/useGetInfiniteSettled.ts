import { useInfiniteQuery, type UseInfiniteQueryResult, type InfiniteData } from '@tanstack/react-query';
import { getSettledData } from '../../api/transaction/useGetSettledData';
import type { TSettledData } from '../../types/transaction';

export const useGetInfiniteSettled = (
  memberId: number,
  size: number,
): UseInfiniteQueryResult<InfiniteData<TSettledData[], number>, Error> => {
  return useInfiniteQuery<TSettledData[], Error, InfiniteData<TSettledData[], number>, (string | number)[], number>({
    queryKey: ['settled', memberId, size],
    queryFn: ({ pageParam = 0 }) => getSettledData(memberId, pageParam, size),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length === 0) return undefined;
      return allPages.length;
    },
  });
};
