import { useQuery } from '@tanstack/react-query';
import { request } from './common/axiosInstance';
import type { TChat } from '../types/chat';

export const getChatList = (
  categoryId: number,
  lastChatroomId?: number | undefined,
  size?: number,
): Promise<TChat[]> => {
  const queryParam = lastChatroomId ? `?lastChatroomId=${lastChatroomId}&` : '?';
  return request<TChat[]>({
    method: 'GET',
    url: `/api/chatroom/${categoryId}${queryParam}size=${size}`,
  });
};

export const useGetChatList = (categoryId: number, lastChatroomId?: number, size?: number) => {
  return useQuery({
    queryKey: ['chatList', categoryId],
    queryFn: () => getChatList(categoryId, lastChatroomId, size),
  });
};
