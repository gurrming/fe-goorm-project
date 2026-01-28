import { useEffect } from 'react';
import { useNotificationStore } from '../../store/websocket/useNotificationStore';
import { useWebsocket } from '../useWebsocket';
import type { TNotification } from '../../types/websocket';

export const useNotification = (memberId: number) => {
  const { isConnected, stompClientRef } = useWebsocket();
  const { addNotificationData } = useNotificationStore();

  useEffect(() => {
    if (isConnected && stompClientRef.current && memberId) {
      const subscription = stompClientRef.current.subscribe(`/topic/notification/${memberId}`, (message) => {
        try {
          const data: TNotification = JSON.parse(message.body);
          addNotificationData(data);
        } catch (error) {
          console.error('[useAsset] 데이터 파싱 에러:', error);
        }
      });
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [isConnected, memberId, addNotificationData, stompClientRef]);
};
