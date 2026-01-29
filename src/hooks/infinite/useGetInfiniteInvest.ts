import { useInfiniteQuery, type UseInfiniteQueryResult, type InfiniteData } from '@tanstack/react-query';
import { getInvest } from '../../api/useGetInvest';
import type { TMyPortfolio } from '../../types/asset';

export const useGetInfiniteInvest = (
  memberId: number,
  size: number,
): UseInfiniteQueryResult<InfiniteData<TMyPortfolio, number>, Error> => {
  return useInfiniteQuery<TMyPortfolio, Error, InfiniteData<TMyPortfolio, number>, (string | number)[], number>({
    queryKey: ['invest', memberId, size],
    queryFn: ({ pageParam = 0 }) => getInvest(memberId, pageParam, size),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.hasNext == false) return undefined;
      return allPages.length;
    },
  });
};
