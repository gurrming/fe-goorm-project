import type { TNotification } from '../../types/websocket';

export default function NotificationItem({ item }: { item: TNotification }) {
  const title = {
    TRADE: '체결',
    SYSTEM: '시스템',
  };
  const NOW = new Date().getTime();
  const milliSeconds = NOW - new Date(item.createdAt).getTime();
  const seconds = milliSeconds / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const time =
    days > 1
      ? `${Math.floor(days)}일 전`
      : hours > 1
        ? `${Math.floor(hours)}시간 전`
        : minutes > 1
          ? `${Math.floor(minutes)}분 전`
          : `${Math.floor(seconds)}초 전`;
  return (
    <div
      key={item.notificationId}
      className={`${item.notificationIsRead ? 'bg-gray-100' : 'bg-white'} p-4 flex flex-col gap-1 hover:bg-gray-100`}
    >
      <div className="flex justify-between items-center">
        <p className="text-sm font-bold text-gray-700">{title[item.notificationType as keyof typeof title]}</p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
      <p className="text-sm">{item.notificationContent}</p>
    </div>
  );
}
