import { useCallback, useEffect, useState } from 'react';
import { useGetChatList } from '../../api/useGetChatList';
import useUserStore from '../../store/useUserStore';
import { useWebsocket } from '../useWebsocket';
import type { TChat } from '../../types/chat';

export const useChatting = ({ categoryId }: { categoryId: number }) => {
  const { isConnected, stompClientRef } = useWebsocket();
  const [chatHistory, setChatHistory] = useState<TChat[]>([]);
  const { data: chatList, refetch } = useGetChatList(categoryId);
  const user = useUserStore((state) => state.user);

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
      const subscriptionPath = `/topic/chat/${categoryId}`;
      console.log(`[useChatting] 구독 시작: ${subscriptionPath}`);

      const subscription = stompClientRef.current.subscribe(subscriptionPath, (message) => {
        try {
          const body = JSON.parse(message.body);
          setChatHistory((prev) => {
            const updated = [...prev, body];
            console.log('[useChatting] chatHistory 업데이트:', updated);
            return updated;
          });
        } catch (error) {
          console.error('[useChatting] 데이터 파싱 에러:', error, message.body);
        }
      });

      // 구독이 제대로 활성화되었는지 확인
      console.log('[useChatting] 구독 객체:', subscription);
      console.log('[useChatting] 구독 ID:', subscription.id);

      return () => {
        console.log(`[useChatting] 구독 해제: ${subscriptionPath}`);
        subscription.unsubscribe();
      };
    } else {
      console.warn('[useChatting] 구독 조건 불만족:', {
        isConnected,
        hasStompClient: !!stompClientRef.current,
        categoryId,
      });
    }
  }, [isConnected, categoryId, stompClientRef]);

  const sendChat = useCallback(
    (message: string) => {
      console.log('[useChatting] sendChat 호출:', {
        message,
        hasStompClient: !!stompClientRef.current,
        isActive: stompClientRef.current?.active,
        categoryId,
        user,
      });

      if (!user) {
        console.error('[useChatting] 채팅 전송 실패: 사용자 정보가 없습니다.');
        return;
      }

      if (!stompClientRef.current?.active) {
        console.error('[useChatting] 채팅 전송 실패: WebSocket이 연결되지 않았습니다.', {
          hasStompClient: !!stompClientRef.current,
          isActive: stompClientRef.current?.active,
        });
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
        console.log('[useChatting] 채팅 전송 성공');
      } catch (error) {
        console.error('[useChatting] publish 에러:', error);
      }
    },
    [categoryId, stompClientRef, user],
  );

  return { isConnected, sendChat, chatHistory };
};
