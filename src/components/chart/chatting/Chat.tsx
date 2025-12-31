import React from 'react';

const Chat = ({
  nickname,
  message,
  time,
  hideDay,
}: {
  nickname: string;
  message: string;
  time: string;
  hideDay: boolean;
}) => {
  const DAY = time.split('T')[0];
  const TIME = time.split('T')[1].slice(0, 5);

  return (
    <div className="flex flex-col gap-1">
      {!hideDay && <p className=" text-xs text-gray-500 text-center bg-gray-100 p-1 rounded-md">{DAY}</p>}
      <p className="text-sm font-bold">{nickname}</p>
      <div className="flex gap-1 items-end">
        <p className="bg-gray-100 p-2 rounded-md text-sm text-center">{message}</p>
        <p className="text-xs text-gray-500">{TIME}</p>
      </div>
    </div>
  );
};

export default Chat;
