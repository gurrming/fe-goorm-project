import { useInfiniteQuery, type UseInfiniteQueryResult, type InfiniteData } from '@tanstack/react-query';
import { getUnSettledData } from '../../api/transaction/useGetUnSettledData';
import type { TUnSettledData } from '../../types/transaction';  

export const useGetInfiniteUnSettled = (
  memberId: number,
  size: number,
): UseInfiniteQueryResult<InfiniteData<TUnSettledData[], number>, Error> => {
  return useInfiniteQuery<TUnSettledData[], Error, InfiniteData<TUnSettledData[], number>, (string | number)[], number>({
    queryKey: ['unsettled', memberId, size],
    queryFn: ({ pageParam = 0 }) => getUnSettledData(memberId, pageParam, size),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length === 0) return undefined;
      return allPages.length;
    },
  });
};
