import { useInfiniteQuery, type UseInfiniteQueryResult, type InfiniteData } from '@tanstack/react-query';
import { getChatList } from '../../api/useGetChatList';
import type { TChat } from '../../types/chat';

export const useGetInfiniteChat = (
  categoryId: number,
  size: number,
): UseInfiniteQueryResult<InfiniteData<TChat[], number>, Error> => {
  return useInfiniteQuery<
    TChat[],
    Error,
    InfiniteData<TChat[], number>,
    (string | number | undefined)[],
    number | undefined
  >({
    queryKey: ['chatList', categoryId, size],
    queryFn: ({ pageParam }) => getChatList(categoryId, pageParam, size),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      if (!lastPage || lastPage.length === 0) return undefined;
      return lastPage[lastPage.length - 1].chatId;
    },
    gcTime: 0,
  });
};
