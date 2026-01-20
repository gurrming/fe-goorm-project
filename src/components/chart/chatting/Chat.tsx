import { IsMe } from './IsMe';

const Chat = ({
  nickname,
  message,
  time,
  hideDay,
  userId,
}: {
  nickname: string;
  message: string;
  time: string;
  hideDay: boolean;
  userId: number;
}) => {
  const isMe = IsMe({ userId });
  const DAY = time.split('T')[0];
  const date = new Date(time);
  date.setHours(date.getHours());
  const TIME = date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="flex flex-col gap-1 mb-3">
      {!hideDay && <p className=" text-xs text-gray-500 text-center bg-gray-100 p-1 rounded-md">{DAY}</p>}
      <p className="text-sm font-bold">
        {nickname} {isMe ? '(Me)' : ''}
      </p>
      <div className="flex gap-1 items-end">
        <p className={`${isMe ? 'bg-[#ebf2ff]' : 'bg-gray-100'} p-2 rounded-md text-sm`}>{message}</p>
        <p className="text-xs text-gray-500">{TIME}</p>
      </div>
    </div>
  );
};

export default Chat;
