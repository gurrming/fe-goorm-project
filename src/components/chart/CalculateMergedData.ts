import type { InfiniteData } from "@tanstack/react-query";

/**
 * 무한 스크롤 데이터(historical)와 실시간 데이터(realtime)를 병합하는 제네릭 함수
 * * @param infiniteData - React Query의 InfiniteData
 * @param realtimeData - 실시간 데이터 배열
 * @param uniqueKeyFn - (선택) 중복 제거를 위한 고유 키(ID 등)를 추출하는 함수
 * @param sortFn - (선택) 정렬을 위한 비교 함수
 */
export const calculateMergedData = <T>(
  infiniteData: InfiniteData<T[], unknown> | undefined,
  realtimeData: T[],
  uniqueKeyFn?: (item: T) => string | number,
  sortFn?: (a: T, b: T) => number
): T[] => {
  const historical = infiniteData ? infiniteData.pages.flat() : [];

  if (!uniqueKeyFn || !sortFn) {
    return [...historical, ...realtimeData];
  }

  const dataMap = new Map<string | number, T>();

  historical.forEach((item) => dataMap.set(uniqueKeyFn(item), item));
  realtimeData.forEach((item) => dataMap.set(uniqueKeyFn(item), item));

  return Array.from(dataMap.values()).sort(sortFn);
};