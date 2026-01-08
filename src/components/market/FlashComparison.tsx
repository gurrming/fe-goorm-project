import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '../../lib/utils';

type FlashDirection = 'up' | 'down' | 'same';

type FlashComparisonProps = {
  /** 비교할 값(예: item 체결가). 값이 바뀌면 flash */
  value: number | null | undefined;
  /** 값 비교/flash를 잠시 꺼두고 싶을 때 */
  enabled?: boolean;
  /** flash 지속 시간 */
  durationMs?: number;
  /** wrapper class */
  className?: string;
  /** 감쌀 대상 */
  children: ReactNode;
};

/**
 * Market용: ref로 이전값을 들고 있다가 값이 바뀌면 깜빡임(방향색 포함)
 * - 실시간 데이터가 들어오기 전엔 enabled={false}로 두고, 나중에 value만 꽂으면 됨
 */
export default function FlashComparison({
  value,
  enabled = true,
  durationMs = 220,
  className,
  children,
}: FlashComparisonProps) {
  const prevRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);
  const [isFlashing, setIsFlashing] = useState(false);
  const [direction, setDirection] = useState<FlashDirection>('same');
  const [flashKey, setFlashKey] = useState(0);

  useEffect(() => {
    if (!enabled) {
      prevRef.current = typeof value === 'number' ? value : null;
      return;
    }

    if (typeof value !== 'number') return;

    const prev = prevRef.current;
    if (prev === null) {
      prevRef.current = value;
      return;
    }

    if (prev !== value) {
      const nextDirection: FlashDirection = value > prev ? 'up' : value < prev ? 'down' : 'same';
      setDirection(nextDirection);
      setIsFlashing(true);
      setFlashKey((k) => k + 1);

      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setIsFlashing(false), durationMs);

      prevRef.current = value;
    }
  }, [value, enabled, durationMs]);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className={cn('relative', className)}>
      {children}
      {isFlashing && (
        <div
          key={flashKey}
          className={cn(
            'pointer-events-none absolute inset-0',
            direction === 'up' && 'flash-up',
            direction === 'down' && 'flash-down',
            direction === 'same' && 'flash',
          )}
          style={{ borderRadius: 'inherit' }}
        />
      )}
    </div>
  );
}
