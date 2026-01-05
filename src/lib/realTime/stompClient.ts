// 1️⃣ stompClient.ts
// 🎯 한 줄 역할
// WebSocket/STOMP 연결 자체를 관리하는 “네트워크 관리자”

// 여기서만 하는 일
// /ws-heartbit 로 연결을 열고 닫는다

// STOMP client 생성

// reconnect / heartbeat 옵션 관리

// subscribe(topic, handler) 제공

// unsubscribe(topic) 제공

// src/lib/realtime/stompClient.ts
import { Client, IMessage, StompSubscription } from '@stomp/stompjs';

type Handler = (msg: IMessage) => void;

let client: Client | null = null;
const subs = new Map<string, StompSubscription>();

export function connectStomp(brokerURL: string, onConnected?: () => void) {
  if (client?.active) return;

  const next = new Client({
    brokerURL,
    reconnectDelay: 3000,
    heartbeatIncoming: 10000,
    heartbeatOutgoing: 10000,
    debug: (str) => {
      console.log('[stomp]', str);
    },
  });

  next.onConnect = () => onConnected?.();
  next.onStompError = (frame) => {
    console.error('STOMP error:', frame.headers['message'], frame.body);
  };
  next.onWebSocketClose = (evt) => {
    console.log('WS closed:', evt);
  };

  client = next;
  next.activate();
}

export function subscribeTopic(topic: string, handler: Handler) {
  if (!client) throw new Error('STOMP client not initialized');
  if (!client.connected) {
    throw new Error('STOMP client not connected. Wait for onConnected callback.');
  }
  if (subs.has(topic)) return;

  const sub = client.subscribe(topic, handler);
  subs.set(topic, sub);
}

export function unsubscribeTopic(topic: string) {
  subs.get(topic)?.unsubscribe();
  subs.delete(topic);
}

/**
 * 클라이언트 → 서버로 메시지 전송 (/app 엔드포인트)
 * @param destination - /app으로 시작하는 destination (예: /app/chat)
 * @param body - 전송할 메시지 본문 (JSON.stringify 필요)
 * @param headers - 추가 헤더 (선택)
 */
export function publishMessage(destination: string, body: string | object, headers?: Record<string, string>) {
  if (!client?.connected) {
    throw new Error('STOMP client not connected');
  }

  const messageBody = typeof body === 'string' ? body : JSON.stringify(body);

  client.publish({
    destination,
    body: messageBody,
    headers,
  });
}

export function disconnectStomp() {
  for (const [, sub] of subs) sub.unsubscribe();
  subs.clear();

  client?.deactivate();
  client = null;
}

/**
 * STOMP 클라이언트 연결 상태 확인
 */
export function isConnected(): boolean {
  return client?.connected ?? false;
}
