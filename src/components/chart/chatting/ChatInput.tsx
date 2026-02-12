import { useState } from 'react';

interface IChatInputProps {
  sendChat: (message: string) => void;
  isConnected: boolean;
}

export const ChatInput = ({ sendChat, isConnected }: IChatInputProps) => {
  const [message, setMessage] = useState('');
  const [isComposing, setIsComposing] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && message.trim() !== '' && !isComposing && isConnected) {
      //   isScrollingToBottomRef.current = true;
      sendChat(message);
      setMessage('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue.length > 500) {
      setMessage(newValue.slice(0, 500));
    } else {
      setMessage(newValue);
    }
  };

  return (
    <div className="flex items-center gap-2 p-4 border-t border-gray-200">
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded-md"
        placeholder="메시지를 입력해주세요."
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
      />
      <p className="text-xs text-gray-500">{message.length}/500</p>
    </div>
  );
};
