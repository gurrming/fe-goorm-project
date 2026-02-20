import { memo, useMemo } from 'react';
import { calculateMergedData } from './CalculateMergedData';
import Chart from './Chart';
import { Chart_Skeleton } from './loading/Chart_Skeleton';
import { useGetInfiniteChart } from '../../hooks/infinite/useGetInfiniteChart';
import { useChartStore } from '../../store/websocket/useChartStore';
import type { ChartData } from '../../types/websocket';

const ChartDataWrapper = ({ categoryId }: { categoryId: number }) => {
  const realtimeData = useChartStore((state) => state.chartDataList);
  const { data: infiniteData, fetchNextPage, hasNextPage, isPending } = useGetInfiniteChart(categoryId, 300);

  const mergedData = useMemo(() => {
    return calculateMergedData<ChartData>(
      infiniteData,
      realtimeData,
      (data) => data.t,
      (a, b) => a.t - b.t,
    );
  }, [infiniteData, realtimeData]);

  if (isPending) return <Chart_Skeleton />;

  if (!mergedData || mergedData.length === 0) {
    return (
      <div className="flex justify-center items-center h-[450px]">
        <p className="text-center text-gray-500">차트 데이터가 없습니다.</p>
      </div>
    );
  }

  return <Chart data={mergedData} fetchNextPage={fetchNextPage} hasMore={hasNextPage} />;
};

export default memo(ChartDataWrapper);
