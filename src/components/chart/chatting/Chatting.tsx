import React, { useEffect, useRef, useState } from 'react';
import Chat from './Chat';
import { useChatting } from '../../../hooks/websocket/useChatting';
import useCategoryIdStore from '../../../store/useCategoryId';
import useUserStore from '../../../store/useUserStore';

const Chatting = () => {
  const [message, setMessage] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const [textLength, setTextLength] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const categoryId = useCategoryIdStore((state) => state.categoryId);
  const { user } = useUserStore();

  const { isConnected, sendChat, chatHistory } = useChatting({ categoryId });

  // 채팅 내역이 업데이트될 때마다 스크롤을 맨 아래로
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && message.trim() !== '' && !isComposing && isConnected) {
      sendChat(message);
      setMessage('');
      setTextLength(0);
    }
  };

  return (
    <div className="flex flex-col w-[1000px] h-[537px]">
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-4 space-y-2">
        {chatHistory.length === 0 && (
          <div className="flex justify-center items-center h-full">
            <p className="text-center text-gray-500">채팅 내역이 없습니다.</p>
          </div>
        )}
        {chatHistory.length > 0 &&
          chatHistory.map((chat, index) => {
            const prevChat = index > 0 ? chatHistory[index - 1] : null;
            let hideDay = false;
            const sendDay = chat.chatTime.split('T')[0];

            if (prevChat) {
              // 날짜가 다르면 hideDay = false (날짜 표시), 같으면 hideDay = true (날짜 숨김)
              hideDay = sendDay === prevChat.chatTime.split('T')[0];
            }

            return (
              <Chat
                key={index}
                nickname={chat.memberNickname}
                message={chat.chatContent}
                time={chat.chatTime}
                hideDay={hideDay}
                userId={chat.memberId}
              />
            );
          })}
      </div>
      {user && (
        <div className="flex items-center gap-2 p-4 border-t border-gray-200">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="메시지를 입력해주세요."
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setTextLength(e.target.value.length);
              if (e.target.value.length > 500) {
                setMessage(e.target.value.slice(0, 500));
                setTextLength(500);
              }
            }}
            onKeyDown={handleKeyDown}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
          />
          <p className="text-xs text-gray-500">{textLength}/500</p>
        </div>
      )}
    </div>
  );
};

export default Chatting;
