import { screen, waitFor } from '@testing-library/react';
import { Mock, vi } from 'vitest';
import { formatTimeAgo } from '../formatTimeAgo';
import { useGetNotification } from '@/api/notification/useGetNotification';
import { usePatchAllNotification } from '@/api/notification/usePatchNotification';
import { useWebsocket } from '@/hooks/useWebsocket';
import { mockUseNotificationStore, mockUseUserStore } from '@/lib/test/mockZustandStore';
import render from '@/lib/test/render';
import { useNotificationStore } from '@/store/websocket/useNotificationStore';


vi.mock('@/hooks/useWebsocket', () => ({
    useWebsocket: vi.fn(),
}));
vi.mock('@/hooks/websocket/useNotification', () => ({
    useNotification: vi.fn(),
}));

vi.mock('@/api/notification/useGetNotification', () => ({
    useGetNotification: vi.fn(),
}));
vi.mock('@/api/notification/usePatchNotification', () => ({
    usePatchAllNotification: vi.fn(),
}));


describe('Notification 통합 테스트', () => {
    beforeEach(() => {
        mockUseUserStore({ user: { id: 1, nickname: 'test' } });
        mockUseNotificationStore({ 
            notificationData: [], 
            popNotification: vi.fn(), 
            addNotificationData: vi.fn(), 
            clearNotificationData: vi.fn() 
        });
        (useWebsocket as Mock).mockReturnValue({
            isConnected: true,
            stompClientRef: { current: {} },
            connect: vi.fn(),
            disconnect: vi.fn(),
        });
    });
    
    describe('조회 테스트', () => {
        it('N-01: 1개 이상의 알림 목록 조회', async () => {
            // vi.doUnmock('../Notification.tsx');
            const { default: NotificationComponent } = await import('../Notification');
            (useGetNotification as Mock).mockReturnValue({
                data:[
                    {
                        notificationId: 1,
                        notificationContent: 'test',
                        notificationType: 'TRADE',
                        notificationIsRead: false,
                        createdAt: '2024-01-01T12:00:00',
                    }
                ],
            })

            await render(<NotificationComponent anchorRect={{ bottom: 0, right: 0, left: 0, top: 0, x: 0, y: 0, width: 0, height: 0, toJSON: vi.fn() }} width="400px" setOpen={vi.fn()} />);
            expect(screen.getByText('test')).toBeInTheDocument();
        });

        it('N-02: 0개의 알림 목록 조회', async () => {
            const { default: NotificationComponent } = await import('../Notification');
            (useGetNotification as Mock).mockReturnValue({
                data: [],
            })

            await render(<NotificationComponent anchorRect={{ bottom: 0, right: 0, left: 0, top: 0, x: 0, y: 0, width: 0, height: 0, toJSON: vi.fn() }} width="400px" setOpen={vi.fn()} />);
            expect(screen.getByText('알림이 없습니다.')).toBeInTheDocument();
        });
    });

    describe('읽음 처리 테스트', () => {
        it('N-03: 알림 모두 읽음 처리', async () => {
            const { default: NotificationComponent } = await import('../Notification');
            (useGetNotification as Mock).mockReturnValue({
                data: [
                    {
                        notificationId: 1,
                        notificationContent: 'test',
                        notificationType: 'TRADE',
                        notificationIsRead: false,
                        createdAt: '2024-01-01T12:00:00',
                    }
                ],
            })

            const mutateMock = vi.fn();
            (usePatchAllNotification as Mock).mockReturnValue({
                mutate: mutateMock,
            });
            const { user } = await render(<NotificationComponent anchorRect={{ bottom: 0, right: 0, left: 0, top: 0, x: 0, y: 0, width: 0, height: 0, toJSON: vi.fn() }} width="400px" setOpen={vi.fn()} />);
            await user.hover(screen.getByTestId('notification-container'));
            await user.unhover(screen.getByTestId('notification-container'));

            expect(mutateMock).toHaveBeenCalledTimes(1);
        });

        it('N-04: 새로 온 알림 없으면 api 요청 X', async () => {
            const { default: NotificationComponent } = await import('../Notification');
            (useGetNotification as Mock).mockReturnValue({
                data: [
                    {
                        notificationId: 1,
                        notificationContent: 'test',
                        notificationType: 'TRADE',
                        notificationIsRead: true,
                        createdAt: '2024-01-01T12:00:00',
                    }
                ],
            })

            const mutateMock = vi.fn();
            (usePatchAllNotification as Mock).mockReturnValue({
                mutate: mutateMock,
            });
            const { user } = await render(<NotificationComponent anchorRect={{ bottom: 0, right: 0, left: 0, top: 0, x: 0, y: 0, width: 0, height: 0, toJSON: vi.fn() }} width="400px" setOpen={vi.fn()} />);
            await user.hover(screen.getByTestId('notification-container'));
            await user.unhover(screen.getByTestId('notification-container'));

            expect(mutateMock).toHaveBeenCalledTimes(0);
        });
    });

    describe('실시간 알림 조회 테스트', () => {
        it('N-05: 실시간 알림 수신 시 Store에 데이터가 추가', async () => {
            const {addNotificationData, notificationData} = useNotificationStore.getState();
            expect(notificationData).toHaveLength(0);
            addNotificationData({ 
                notificationId: 1, 
                notificationContent: 'test', 
                notificationType: 'TRADE', 
                notificationIsRead: false, 
                createdAt: '2024-01-01T12:00:00' 
            });
            waitFor(()=>{
                const updateStore = useNotificationStore.getState();
                expect(updateStore.notificationData).toHaveLength(1);
            });
        });
        it('N-06: 목록 조회 중 실시간 알림 수신 시 목록 자동 갱신', async () => {
            const { default: NotificationComponent } = await import('../Notification');

            (useGetNotification as Mock).mockReturnValue({
                data:[
                    {
                        notificationId: 1,
                        notificationContent: 'test1',
                        notificationType: 'TRADE',
                        notificationIsRead: false,
                        createdAt: '2024-01-01T12:00:00',
                    }
                ],
            })
            const { rerender } = await render(<NotificationComponent anchorRect={{ bottom: 0, right: 0, left: 0, top: 0, x: 0, y: 0, width: 0, height: 0, toJSON: vi.fn() }} width="400px" setOpen={vi.fn()} />);
            expect(screen.getByText('test1')).toBeInTheDocument();

            (useGetNotification as Mock).mockReturnValue({
                data: [
                    {
                        notificationId: 2,
                        notificationContent: 'test2', // 새로 들어온 알림
                        notificationType: 'TRADE',
                        notificationIsRead: false,
                        createdAt: '2024-01-01T12:05:00',
                    },
                    {
                        notificationId: 1,
                        notificationContent: 'test1',
                        notificationType: 'TRADE',
                        notificationIsRead: false,
                        createdAt: '2024-01-01T12:00:00',
                    }
                ],
            });
            rerender(<NotificationComponent anchorRect={{ bottom: 0, right: 0, left: 0, top: 0, x: 0, y: 0, width: 0, height: 0, toJSON: vi.fn() }} width="400px" setOpen={vi.fn()} />);
            waitFor(()=>{
                expect(screen.getByText('test2')).toBeInTheDocument();
                expect(screen.getByText('test1')).not.toBeInTheDocument();
            });
        });
    });

    describe('실시간 알림 처리 테스트', () => {
        beforeEach(() => {
            vi.setSystemTime(new Date('2026-02-03T12:10:00'));
        });
        afterEach(() => {
            vi.useRealTimers();
        });
        it('N-07: 알림 시간 로직 테스트', async () => {
            const time = formatTimeAgo('2026-02-03T12:00:00');
            expect(time).toBe('10분 전');
        });
    });
      

});