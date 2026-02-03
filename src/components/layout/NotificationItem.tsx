import { formatTimeAgo } from './formatTimeAgo';
import type { TNotification } from '../../types/websocket';

export default function NotificationItem({ item }: { item: TNotification }) {
  const title = {
    TRADE: '체결',
    SYSTEM: '시스템',
  };
  
  const time = formatTimeAgo(item.createdAt);
  return (
    <div
      key={item.notificationId}
      className={`${item.notificationIsRead ? 'bg-gray-100' : 'bg-white'} p-4 flex flex-col gap-1 hover:bg-gray-100`}
    >
      <div className="flex justify-between items-center">
        <p className={`text-sm ${item.notificationIsRead ? 'text-gray-500' : 'font-bold text-gray-700'}`}>{title[item.notificationType as keyof typeof title]}</p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
      <p className={`text-sm ${item.notificationIsRead ? 'text-gray-500' : 'text-gray-700'}`}>{item.notificationContent}</p>
    </div>
  );
}
