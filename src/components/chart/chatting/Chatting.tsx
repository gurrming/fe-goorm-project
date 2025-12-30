import React, { useState } from 'react';
import Chat from './Chat';
import { mockChatData } from './mockData';

const Chatting = () => {
  const [message, setMessage] = useState('');
  const [isComposing, setIsComposing] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && message.trim() !== '' && !isComposing) {
      setMessage((e.target as HTMLInputElement).value);
      console.log(message);
      setMessage('');
    }
  };
  return (
    <div className="flex flex-col gap-2 w-[1000px] p-4">
      {mockChatData.map((chat, index) => {
        const prevChat = index > 0 ? mockChatData[index - 1] : null;
        let hideDay = false;
        const sendDay = chat.time.split('T')[0];

        if (prevChat) {
          // 날짜가 다르면 hideDay = false (날짜 표시), 같으면 hideDay = true (날짜 숨김)
          hideDay = sendDay === prevChat.time.split('T')[0];
        }

        return <Chat key={index} {...chat} hideDay={hideDay} />;
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
