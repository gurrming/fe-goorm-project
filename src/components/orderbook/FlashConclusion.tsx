import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '../../lib/utils';

type FlashConclusionProps = {
  /** 호가 테이블에 반영되는 체결가(lastPrice). 값이 바뀌면 flash */
  value: number | null | undefined;
  enabled?: boolean;
  durationMs?: number;
  className?: string;
  children: ReactNode;
};

/**
 * Orderbook용: 이전 체결가와 현재 체결가가 다르면 깜빡임
 * - 검은 테두리 유지(해당 가격행 강조)는 별도(호가 item에서 lastPrice 매칭으로 처리)
 */
export default function FlashConclusion({
  value,
  enabled = true,
  durationMs = 220,
  className,
  children,
}: FlashConclusionProps) {
  const prevRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);
  const [isFlashing, setIsFlashing] = useState(false);
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
          className={cn('pointer-events-none absolute inset-0', 'flash')}
          style={{ borderRadius: 'inherit' }}
        />
      )}
    </div>
  );
}
