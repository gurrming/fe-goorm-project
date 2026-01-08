import { useCallback, useEffect, useState } from 'react';
import { useGetChatList } from '../../api/useGetChatList';
import { useWebsocket } from '../useWebsocket';
import type { TChat } from '../../types/chat';

export const useChatting = ({ categoryId }: { categoryId: number }) => {
  const { isConnected, stompClientRef } = useWebsocket();
  const [chatHistory, setChatHistory] = useState<TChat[]>([]);
  const { data: chatList, refetch } = useGetChatList(categoryId);

  useEffect(() => {
    if (chatList) {
      setChatHistory(chatList);
    }
  }, [chatList]);

  useEffect(() => {
    refetch();
  }, [categoryId, refetch]);

  useEffect(() => {
    if (isConnected && stompClientRef.current && categoryId) {
      const subscription = stompClientRef.current.subscribe(`/topic/chat/${categoryId}`, (message) => {
        try {
          const body = JSON.parse(message.body);
          console.log(JSON.stringify(body));
          setChatHistory((prev) => [...prev, body]);
        } catch (error) {
          console.error('[useChatting] 데이터 파싱 에러:', error);
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [isConnected, categoryId]);

  const sendChat = useCallback(
    (message: string) => {
      if (stompClientRef.current?.active) {
        stompClientRef.current.publish({
          destination: `/app/chat/${categoryId}`,
          body: JSON.stringify({ message }),
        });
      }
    },
    [categoryId],
  );

  return { isConnected, sendChat, chatHistory };
};
