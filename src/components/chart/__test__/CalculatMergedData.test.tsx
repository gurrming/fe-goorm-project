import type { InfiniteData } from '@tanstack/react-query';
import { calculateMergedData } from '../calculateMergedData';
import type { ChartData } from '../../../types/websocket';

describe('calculateMergedData 단위 테스트', () => {
    const createMockData = (id: number): ChartData => ({
        t: id, o: 100, h: 110, l: 90, c: 105, tradeId: id
      });

      describe('병합 테스트', () => {
        it('infiniteData와 realtimeData가 모두 없을 때 빈 배열을 반환한다', () => {
          const result = calculateMergedData(undefined, []);
          expect(result).toEqual([]);
        });
      
        it('infiniteData만 있을 때 이를 평탄화(flat)하여 반환한다', () => {
          const mockInfiniteData: InfiniteData<ChartData[], number> = {
            pages: [
              [createMockData(1), createMockData(2)], 
              [createMockData(3)]                     
            ],
            pageParams: [0, 1]
          };
      
          const result = calculateMergedData(mockInfiniteData, []);
      
          // [[1, 2], [3]] -> [1, 2, 3] 으로 잘 합쳐졌는지 확인
          expect(result).toHaveLength(3);
          expect(result[0].t).toBe(1);
          expect(result[2].t).toBe(3);
        });
      
        it('realtimeData만 있을 때 해당 데이터를 그대로 반환한다', () => {
          const mockRealtime = [createMockData(10), createMockData(11)];
          
          const result = calculateMergedData(undefined, mockRealtime);
      
          expect(result).toEqual(mockRealtime);
        });
      
        it('infiniteData와 realtimeData가 모두 있을 때 순서대로 병합한다', () => {
          const mockInfiniteData: InfiniteData<ChartData[], number> = {
            pages: [[createMockData(1)]],
            pageParams: [0]
          };
          const mockRealtime = [createMockData(2)];
      
          const result = calculateMergedData(mockInfiniteData, mockRealtime);
      
          // [과거, 실시간] 순서 확인
          expect(result).toHaveLength(2);
          expect(result[0].t).toBe(1); // 과거 데이터
          expect(result[1].t).toBe(2); // 실시간 데이터
        });
      });

      describe('중복 제거 및 정렬 테스트',()=>{
        const uniqueKeyFn = (item: ChartData) => item.t; 
        const sortFn = (a: ChartData, b: ChartData) => a.t - b.t; 

        it('중복된 데이터가 있을 경우 실시간 데이터(realtimeData)가 우선순위를 가진다', () => {
          const mockInfiniteData: InfiniteData<ChartData[], number> = {
            pages: [[createMockData(1), createMockData(2)]], 
            pageParams: [0],
          };
          
          const updatedItem2 = createMockData(2); 
          updatedItem2.c = 999;
          const mockRealtime = [updatedItem2, createMockData(3)];

          const result = calculateMergedData(
            mockInfiniteData,
            mockRealtime,
            uniqueKeyFn,
            sortFn
          );

          expect(result).toHaveLength(3);
          expect(result[0].t).toBe(1);
          
          expect(result[1].t).toBe(2);
          expect(result[1].c).toBe(999); 
          
          expect(result[2].t).toBe(3);
        });

        it('데이터 순서가 뒤섞여 있어도 sortFn에 따라 정렬되어야 한다', () => {
          const mockInfiniteData: InfiniteData<ChartData[], number> = {
            pages: [[createMockData(3), createMockData(1)]], 
            pageParams: [0],
          };
          const mockRealtime = [createMockData(2)];

          const result = calculateMergedData(
            mockInfiniteData,
            mockRealtime,
            uniqueKeyFn,
            sortFn
          );
          
          expect(result).toHaveLength(3);
          expect(result[0].t).toBe(1);
          expect(result[1].t).toBe(2);
          expect(result[2].t).toBe(3);
        });
      });
      
});