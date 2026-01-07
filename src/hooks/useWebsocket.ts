import * as Stomp from '@stomp/stompjs';
import { useCallback, useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';

/**
 * websocket hook
 *
 * connect: 웹소켓 연결 (토큰 필요)
 * disconnect: 웹소켓 연결 해제
 *
 * @returns
 *
 */

export const useWebsocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const stompClientRef = useRef<Stomp.Client | null>(null);
  const retryCountRef = useRef(0);
  const maxRetryCount = 5;

  const connect = useCallback((token?: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (stompClientRef.current && stompClientRef.current.active) {
        resolve();
        return;
      }
      const headers: Record<string, string> = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const client = new Stomp.Client({
        webSocketFactory: () => new SockJS(`${import.meta.env.VITE_WEBSOCKET_URL}`),
        connectHeaders: headers,
        onConnect: () => {
          setIsConnected(true);
          stompClientRef.current = client;
          resolve();
        },
        onStompError: (frame) => {
          console.error('Broker reported error: ' + frame.headers['message']);
          reject(frame);
        },
        onWebSocketClose: () => {
          console.log('WebSocket Closed');
          setIsConnected(false);

          retryCountRef.current += 1;
          if (retryCountRef.current < maxRetryCount) {
            client.deactivate();
          }
        },
      });

      client.activate();
    });
  }, []);

  const disconnect = useCallback(() => {
    if (stompClientRef.current && stompClientRef.current.active) {
      stompClientRef.current.deactivate().then(() => {
        console.log('WebSocket Deactivated');
        setIsConnected(false);
        stompClientRef.current = null;
      });
    }
  }, []);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return { isConnected, stompClientRef, connect, disconnect };
};
