import { create } from 'zustand';
import type { TNotification } from '../../types/websocket';

interface INotificationStore {
  notificationData: TNotification[] | null;
  addNotificationData: (data: TNotification) => void;
  clearNotificationData: () => void;
  popNotification: () => void;
}

const MAX_QUEUE_SIZE = 50;

export const useNotificationStore = create<INotificationStore>((set) => ({
  notificationData: null,
  addNotificationData: (data) => set((state) => {
    const currentQueue = state.notificationData || [];

    if(currentQueue.some(item => item.notificationId === data.notificationId)) {
      return { notificationData: currentQueue };
    };

    let newQueue = [...currentQueue];

    if(data.notificationType === 'SYSTEM') {
      const firstTradeIndex = newQueue.findIndex(item => item.notificationType === 'TRADE');

      if(firstTradeIndex === -1) {
        newQueue.push(data);
      } else {
        newQueue.splice(firstTradeIndex, 0, data);
      }
    } else {
      newQueue.push(data);
    }

    if(newQueue.length > MAX_QUEUE_SIZE) {
      const lastTradeIndex = newQueue.reverse().findIndex(item => item.notificationType === 'TRADE');
        
        if (lastTradeIndex !== -1) {
           newQueue = newQueue.slice(0, MAX_QUEUE_SIZE); 
        } else {
             newQueue = newQueue.slice(0, MAX_QUEUE_SIZE);
        }
    }

    return { notificationData: newQueue.slice(0, MAX_QUEUE_SIZE) };
  }),


  clearNotificationData: () => set({ notificationData: null }),
  popNotification: () =>
    set((state) => {
      if (!state.notificationData || state.notificationData.length === 0) {
        return { notificationData: null };
      }
      const next = state.notificationData.slice(1);
      return { notificationData: next.length > 0 ? next : null };
    }),
}));
