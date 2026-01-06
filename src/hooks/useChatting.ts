import { useCallback, useEffect, useState } from 'react';
import { useWebsocket } from './useWebsocket';
import { useGetChatList } from '../api/useGetChatList';
import type { TChat } from '../types/chat';

export const useChatting = ({ categoryId }: { categoryId: number }) => {
  const { isConnected, stompClientRef } = useWebsocket();
  const [chatHistory, setChatHistory] = useState<TChat[]>([]);

  useEffect(() => {
    const { data: chatList, refetch } = useGetChatList(categoryId);
    setChatHistory(chatList || []);
    refetch();
  }, [categoryId]);

  //   useEffect(() => {
  //     const token = localStorage.getItem('accessToken');
  //     if (token) {
  //       connect(token);
  //     }
  //   }, [connect]);

  useEffect(() => {
    if (isConnected && stompClientRef.current) {
      const subscription = stompClientRef.current.subscribe(`/topic/chat/${categoryId}`, (message) => {
        const body = JSON.parse(message.body);
        console.log(JSON.stringify(body));
        setChatHistory((prev) => [...prev, body]);
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [isConnected, stompClientRef, categoryId]);

  const sendChat = useCallback(
    (message: string) => {
      if (stompClientRef.current?.active) {
        stompClientRef.current.publish({
          destination: `/app/chat/${categoryId}`,
          body: JSON.stringify({ message }),
        });
      }
    },
    [categoryId, stompClientRef],
  );

  return { isConnected, sendChat, chatHistory };
};
