import React, { useState } from 'react';
import Chat from './Chat';
import { useChatting } from '../../../hooks/websocket/useChatting';
import useCategoryIdStore from '../../../store/useCategoryId';
import useUserStore from '../../../store/useUserStore';

const Chatting = () => {
  const [message, setMessage] = useState('');
  const [isComposing, setIsComposing] = useState(false);

  const categoryId = useCategoryIdStore((state) => state.categoryId);
  const { user } = useUserStore();

  const { isConnected, sendChat, chatHistory } = useChatting({ categoryId });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log('[Chatting] handleKeyDown 호출:', {
      isConnected,
    });

    if (e.key === 'Enter' && message.trim() !== '' && !isComposing && isConnected) {
      console.log('[Chatting] 조건 통과 - 메시지 전송:', message);
      sendChat(message);
      setMessage('');
    } else {
      console.log('[Chatting] 조건 불일치:', {
        connected: isConnected,
      });
    }
  };

  return (
    <div className="flex flex-col gap-2 w-[1000px] h-[537px] overflow-y-auto p-4">
      {chatHistory.length === 0 && (
        <div className="flex justify-center items-center h-full">
          <p className="text-center text-gray-500">채팅 내역이 없습니다.</p>
        </div>
      )}
      <div className="flex-1 overflow-y-auto">
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
              />
            );
          })}
      </div>
      {user && (
        <input
          type="text"
          className=" w-full p-2 border border-gray-300 rounded-md"
          placeholder="메시지를 입력해주세요."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
        />
      )}
    </div>
  );
};

export default Chatting;
