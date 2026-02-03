import NotificationItem from '../layout/NotificationItem';
import type { TNotification } from '@/types/websocket';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof NotificationItem> = {
  component: NotificationItem,
  title: 'Layout/NotificationItem',
};

export default meta;

type Story = StoryObj<typeof NotificationItem>;

const baseNotification: TNotification = {
  notificationId: 1,
  notificationContent: '비트코인이 50,000,000원에 체결되었습니다.',
  notificationType: 'TRADE',
  notificationIsRead: false,
  createdAt: new Date().toISOString(),
};

export const Unread: Story = {
  args: {
    item: baseNotification,
  },
};

export const Read: Story = {
  args: {
    item: {
      ...baseNotification,
      notificationId: 2,
      notificationIsRead: true,
      notificationContent: '시스템 점검 예정 안내',
      notificationType: 'SYSTEM',
    },
  },
};
