import type { ReactNode } from 'react';
import * as Stomp from '@stomp/stompjs';
import { createContext, createElement, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import SockJS from 'sockjs-client';

/**
 * websocket hook
 *
 * connect: 웹소켓 연결
 * disconnect: 웹소켓 연결 해제
 *
 * @returns
 *
 */

type WebsocketContextValue = {
  isConnected: boolean;
  stompClientRef: ReturnType<typeof useRef<Stomp.Client | null>>;
  connect: () => Promise<void>;
  disconnect: () => void;
};

const WebsocketContext = createContext<WebsocketContextValue | null>(null);

export const WebsocketProvider = ({ children }: { children: ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);
  const stompClientRef = useRef<Stomp.Client | null>(null);
  const retryCountRef = useRef(0);
  const maxRetryCount = 5;

  const connect = useCallback((): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (stompClientRef.current && stompClientRef.current.active) {
        resolve();
        return;
      }
      const client = new Stomp.Client({
        webSocketFactory: () => new SockJS(`${import.meta.env.VITE_WEBSOCKET_URL}`),
        onConnect: () => {
          setIsConnected(true);
          stompClientRef.current = client;
          retryCountRef.current = 0;
          resolve();
        },
        onStompError: (frame) => {
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

  const value = useMemo(
    () => ({ isConnected, stompClientRef, connect, disconnect }),
    [isConnected, connect, disconnect],
  );

  return createElement(WebsocketContext.Provider, { value }, children);
};

export const useWebsocket = () => {
  const ctx = useContext(WebsocketContext);
  if (!ctx) {
    throw new Error('useWebsocket은 WebsocketProvider 내부에서 사용해야 합니다.');
  }
  return ctx;
};
