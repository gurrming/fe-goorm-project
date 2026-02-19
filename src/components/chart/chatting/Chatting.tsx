import { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import Chat from './Chat';
import { ChatInput } from './ChatInput';
import { Chatting_Skeleton } from './loading/Chatting_Skeleton';
import { useGetInfiniteChat } from '../../../hooks/infinite/useGetInfiniteChat';
import { useChatting } from '../../../hooks/websocket/useChatting';
import useCategoryIdStore from '../../../store/useCategoryId';
import useUserStore from '../../../store/useUserStore';
import { calculateMergedData } from '../CalculateMergedData';
import type { TChat } from '../../../types/chat';

interface IChattingProps {
  categoryId?: number;
}

/** categoryId를 prop으로 받아 스토어 구독 없이 사용 (캐시용, 리렌더 방지) */
const ChattingContent = memo(({ categoryId }: { categoryId: number }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const prevScrollHeightRef = useRef<number>(0);
  const prevChatListLengthRef = useRef<number>(0);
  const isScrollingToBottomRef = useRef<boolean>(false);
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const { user } = useUserStore();

  const { isConnected, sendChat, chatHistory } = useChatting({ categoryId });

  const { data: infiniteData, fetchNextPage, hasNextPage, isFetching, isPending } = useGetInfiniteChat(categoryId, 10);

  const mergedChatList = useMemo(() => {
    return calculateMergedData<TChat>(
      infiniteData,
      chatHistory,
      (chat) => chat.chatId,
      (a, b) => a.chatId - b.chatId,
    );
  }, [infiniteData, chatHistory]);

  const handleSendMessage = useCallback(
    (message: string) => {
      isScrollingToBottomRef.current = true;
      sendChat(message);
    },
    [sendChat],
  );

  // 무한 스크롤: 이전 메시지 불러오기
  useEffect(() => {
    if (inView && hasNextPage && !isFetching && scrollContainerRef.current) {
      prevScrollHeightRef.current = scrollContainerRef.current.scrollHeight;
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  // 무한 스크롤 후 스크롤 위치 유지
  useEffect(() => {
    if (isFetching || !scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const currentScrollHeight = container.scrollHeight;
    const prevScrollHeight = prevScrollHeightRef.current;

    // 이전 메시지를 불러온 경우 (스크롤 높이가 증가)
    if (currentScrollHeight > prevScrollHeight && prevScrollHeight > 0) {
      const scrollDiff = currentScrollHeight - prevScrollHeight;
      container.scrollTop = container.scrollTop + scrollDiff;
      prevScrollHeightRef.current = currentScrollHeight;
    }
  }, [isFetching, mergedChatList.length]);

  // 새 메시지 추가 시 스크롤 조정
  useLayoutEffect(() => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const currentLength = mergedChatList.length;
    const prevLength = prevChatListLengthRef.current;

    // 새 메시지가 추가된 경우
    if (currentLength > prevLength) {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isAtBottom = scrollHeight - scrollTop - clientHeight <= 100;
      const lastChat = mergedChatList[mergedChatList.length - 1];
      const isMyMessage = lastChat?.memberId === user?.id;

      // 맨 아래에 있거나 내 메시지인 경우에만 스크롤
      if (isAtBottom || isMyMessage || isScrollingToBottomRef.current) {
        requestAnimationFrame(() => {
          if (container) {
            container.scrollTop = container.scrollHeight;
            isScrollingToBottomRef.current = false;
          }
        });
      }
    }

    prevChatListLengthRef.current = currentLength;
  }, [mergedChatList, user?.id]);

  if (isPending) {
    return <Chatting_Skeleton />;
  }

  return (
    <div className="flex flex-col w-[1000px] h-[537px]">
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-2"
        data-testid="chat-scroll-container"
      >
        {mergedChatList.length === 0 && (
          <div className="flex justify-center items-center h-full">
            <p className="text-center text-gray-500">채팅 내역이 없습니다.</p>
          </div>
        )}
        <div ref={ref} />
        {mergedChatList.map((chat, index) => {
          const prevChat = index > 0 ? mergedChatList[index - 1] : null;
          const sendDay = chat.chatTime?.split('T')[0] ?? '';
          const hideDay =
            prevChat && sendDay && prevChat.chatTime ? sendDay === prevChat.chatTime.split('T')[0] : false;

          return (
            <Chat
              key={chat.chatId}
              nickname={chat.memberNickname}
              message={chat.chatContent}
              time={chat.chatTime}
              hideDay={hideDay}
              userId={chat.memberId}
            />
          );
        })}
      </div>
      {user && <ChatInput sendChat={handleSendMessage} isConnected={isConnected} />}
    </div>
  );
});

ChattingContent.displayName = 'ChattingContent';

const Chatting = (props: IChattingProps) => {
  const categoryIdFromStore = useCategoryIdStore((state) => state.categoryId);
  const categoryId = props.categoryId ?? categoryIdFromStore;
  return <ChattingContent categoryId={categoryId} />;
};

export default Chatting;
export { ChattingContent };
