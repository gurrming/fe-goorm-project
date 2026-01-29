import { useInfiniteQuery, type UseInfiniteQueryResult, type InfiniteData } from '@tanstack/react-query';
import { getUnSettledData } from '../../api/transaction/useGetUnSettledData';
import type { TUnSettledResponse } from '../../types/transaction';

export const useGetInfiniteUnSettled = (
  memberId: number,
  size: number,
): UseInfiniteQueryResult<InfiniteData<TUnSettledResponse, number>, Error> => {
  return useInfiniteQuery<
    TUnSettledResponse,
    Error,
    InfiniteData<TUnSettledResponse, number>,
    (string | number)[],
    number
  >({
    queryKey: ['unsettled', memberId, size],
    queryFn: ({ pageParam = 0 }) => getUnSettledData(memberId, pageParam, size),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.orders.last) return undefined;
      return lastPage.orders.number + 1;
    },
  });
};
