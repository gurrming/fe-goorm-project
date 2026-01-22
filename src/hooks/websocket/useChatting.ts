import { useCallback, useEffect, useState } from 'react';
import useUserStore from '../../store/useUserStore';
import { useWebsocket } from '../useWebsocket';
import type { TChat } from '../../types/chat';

export const useChatting = ({ categoryId }: { categoryId: number }) => {
  const { isConnected, stompClientRef } = useWebsocket();
  const [chatHistory, setChatHistory] = useState<TChat[]>([]);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    setChatHistory([]);
  }, [categoryId]);

  useEffect(() => {
    if (isConnected && stompClientRef.current && categoryId) {
      const subscriptionPath = `/topic/chat/${categoryId}`;

      const subscription = stompClientRef.current.subscribe(subscriptionPath, (message) => {
        try {
          const body = JSON.parse(message.body);
          setChatHistory((prev) => {
            return [...prev, body];
          });
        } catch (error) {
          console.error('[useChatting] 데이터 파싱 에러:', error, message.body);
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [isConnected, categoryId, stompClientRef]);

  const sendChat = useCallback(
    (message: string) => {
      if (!user) {
        return;
      }

      if (!stompClientRef.current?.active) {
        return;
      }

      const destination = `/app/chat/${categoryId}`;
      // 백엔드 IncomingMessage 형식에 맞춤: { chatContent, memberId }
      const body = JSON.stringify({
        chatContent: message,
        memberId: user.id,
      });

      try {
        stompClientRef.current.publish({
          destination,
          body,
        });
      } catch (error) {
        console.error('[useChatting] publish 에러:', error);
      }
    },
    [categoryId, stompClientRef, user],
  );

  return { isConnected, sendChat, chatHistory };
};
