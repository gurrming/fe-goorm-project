import { create } from 'zustand';
import type { TNotification } from '../../types/websocket';

interface INotificationStore {
  notificationData: TNotification[] | null;
  addNotificationData: (data: TNotification) => void;
  clearNotificationData: () => void;
  popNotification: () => void;
}

export const useNotificationStore = create<INotificationStore>((set) => ({
  notificationData: null,
  addNotificationData: (data) =>
    set((state) => ({ notificationData: [...(state.notificationData || []), data] })),
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
