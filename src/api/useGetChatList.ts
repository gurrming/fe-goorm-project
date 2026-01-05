import { useQuery } from '@tanstack/react-query';
import { request } from './common/axiosInstance';
import type { TChat } from '../types/chat';

const getChatList = (categoryId: number): Promise<TChat[]> => {
  return request<TChat[]>({
    method: 'GET',
    url: `/api/chatroom/${categoryId}`,
  });
};

export const useGetChatList = (categoryId: number) => {
  return useQuery({
    queryKey: ['chatList', categoryId],
    queryFn: () => getChatList(categoryId),
  });
};
