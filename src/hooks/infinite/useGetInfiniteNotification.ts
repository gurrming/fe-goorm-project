import { useInfiniteQuery, type UseInfiniteQueryResult, type InfiniteData } from '@tanstack/react-query';
import { getNotification } from '../../api/notification/useGetNotification';
import type { TNotification } from '../../types/websocket';

export const useGetInfiniteNotification = (
  memberId: number | undefined,
  size: number,
): UseInfiniteQueryResult<InfiniteData<TNotification[], number | null>, Error> => {
  return useInfiniteQuery<
    TNotification[],
    Error,
    InfiniteData<TNotification[], number | null>,
    (string | number | undefined)[],
    number | null
  >({
    queryKey: ['notification', memberId, size],
    queryFn: ({ pageParam = null }) => getNotification(memberId!, pageParam, size),
    initialPageParam: null,
    getNextPageParam: (lastPage: TNotification[]) => {
      if (!lastPage || lastPage.length < size) return undefined;
      return lastPage[lastPage.length - 1].notificationId;
    },
    enabled: !!memberId,
  });
};
