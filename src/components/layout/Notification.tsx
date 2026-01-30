import NotificationItem from './NotificationItem';
import { useGetNotification } from '../../api/notification/useGetNotification';
import useUserStore from '../../store/useUserStore';

export default function Notification({
  anchorRect,
  width = '400px',
  setOpen,
}: {
  anchorRect: DOMRectReadOnly;
  width: string;
  setOpen: (open: boolean) => void;
}) {
  const { user } = useUserStore();
  if (!user) return null;
  const memberId = user.id;
  const { data } = useGetNotification(memberId);

  const parsedWidth = Number.parseInt(width, 10) || 400;

  const positionStyle = anchorRect
    ? {
        position: 'fixed' as const,
        top: anchorRect.bottom + 8,
        left: Math.max(8, Math.min(window.innerWidth - parsedWidth - 8, anchorRect.right - parsedWidth)),
        width: `${parsedWidth}px`,
      }
    : { width };

  const sortedData = data?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div
      className="relative bg-white pt-6 pointer-events-auto border-none rounded-xs shadow-lg flex flex-col h-[300px] overflow-y-auto"
      style={positionStyle}
      onClick={(e) => e.stopPropagation()}
      onMouseLeave={() => setOpen(false)}
    >
      <p className="px-4 pb-2 text-lg font-bold text-gray-700">알림</p>
      {sortedData && sortedData.length > 0 ? (
        sortedData.map((item) => <NotificationItem key={item.notificationId} item={item} />)
      ) : (
        <p className="p-20 text-sm text-center text-gray-500">알림이 없습니다.</p>
      )}
    </div>
  );
}
