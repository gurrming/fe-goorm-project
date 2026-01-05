import * as Stomp from '@stomp/stompjs';
import { useCallback, useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';

export const useWebsocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const stompClientRef = useRef<Stomp.Client | null>(null);

  const connect = useCallback((token: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (stompClientRef.current && stompClientRef.current.active) {
        resolve();
        return;
      }
      const client = new Stomp.Client({
        webSocketFactory: () => new SockJS(`${import.meta.env.VITE_WEBSOCKET_URL}`),
        connectHeaders: {
          Authorization: `Bearer ${token}`,
        },
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
