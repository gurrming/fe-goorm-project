import React, { useState } from 'react';
import Chat from './Chat';
import { useChatting } from '../../../hooks/useChatting';

const Chatting = () => {
  const [message, setMessage] = useState('');
  const [isComposing, setIsComposing] = useState(false);

  const { isConnected, sendChat, chatHistory } = useChatting({ categoryId: 1 });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && message.trim() !== '' && !isComposing && isConnected) {
      sendChat(message);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col gap-2 w-[1000px] p-4">
      {chatHistory.map((chat, index) => {
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
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded-md"
        placeholder="메시지를 입력해주세요."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
      />
    </div>
  );
};

export default Chatting;
