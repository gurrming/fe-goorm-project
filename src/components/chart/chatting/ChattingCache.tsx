import { memo, useEffect, useRef, useState } from 'react';
import { ChattingContent } from './Chatting';
import useCategoryIdStore from '../../../store/useCategoryId';

/**
 * 종목별 Chatting 인스턴스를 캐시하여,
 * 다른 종목 갔다가 돌아올 때 리렌더 없이 기존 인스턴스를 재사용합니다.
 */
const ChattingCache = memo(() => {
  const categoryId = useCategoryIdStore((state) => state.categoryId);
  const visitedIdsRef = useRef<Set<number>>(new Set([categoryId]));
  const [visitedIds, setVisitedIds] = useState<number[]>(() => [categoryId]);

  useEffect(() => {
    const next = new Set(visitedIdsRef.current);
    next.add(categoryId);
    if (next.size !== visitedIdsRef.current.size) {
      visitedIdsRef.current = next;
      setVisitedIds(Array.from(next));
    }
  }, [categoryId]);

  return (
    <>
      {visitedIds.map((id) => (
        <div
          key={id}
          style={{ display: id === categoryId ? 'block' : 'none' }}
          aria-hidden={id !== categoryId}
        >
          <ChattingContent categoryId={id} />
        </div>
      ))}
    </>
  );
});

ChattingCache.displayName = 'ChattingCache';

export default ChattingCache;
