import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import NotificationItem from './NotificationItem';
import { usePatchAllNotification } from '../../api/notification/usePatchNotification';
import { useGetInfiniteNotification } from '../../hooks/infinite/useGetInfiniteNotification';
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
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const { user } = useUserStore();
  const memberId = user?.id;
  if (!memberId) return null;
  const { data: infiniteData, fetchNextPage, hasNextPage, isFetching } = useGetInfiniteNotification(memberId, 10);
  const patchAllNotification = usePatchAllNotification(memberId);

  const parsedWidth = Number.parseInt(width, 10) || 400;

  const positionStyle = anchorRect
    ? {
        position: 'fixed' as const,
        top: anchorRect.bottom + 8,
        left: Math.max(8, Math.min(window.innerWidth - parsedWidth - 8, anchorRect.right - parsedWidth)),
        width: `${parsedWidth}px`,
      }
    : { width };

  const sortedData = infiniteData?.pages
    .flat()
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const handleMouseLeave = () => {
    setOpen(false);
    if (sortedData && sortedData.length > 0 && !sortedData[0].notificationIsRead) {
      patchAllNotification.mutate();
    }
  };

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);
  return (
    <div
      data-testid="notification-container"
      className="relative bg-white pt-6 pointer-events-auto border-none rounded-xs shadow-lg flex flex-col max-h-[300px] overflow-y-auto"
      style={positionStyle}
      onClick={(e) => e.stopPropagation()}
      onMouseLeave={handleMouseLeave}
    >
      <p className="px-4 pb-4 text-lg font-bold text-gray-700">알림</p>
      {sortedData && sortedData.length > 0 ? (
        sortedData.map((item) => <NotificationItem key={item.notificationId} item={item} />)
      ) : (
        <p className="p-20 text-sm text-center text-gray-500">알림이 없습니다.</p>
      )}
      <div ref={ref} />
    </div>
  );
}
