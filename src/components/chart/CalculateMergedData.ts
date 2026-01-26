import type { InfiniteData } from "@tanstack/react-query";
import type { ChartData } from "../../types/websocket";

export const calculateMergedData = (
    infiniteData: InfiniteData<ChartData[], number> | undefined,
    realtimeData: ChartData[]
  ): ChartData[] => {
    const historical = infiniteData ? infiniteData.pages.flat() : [];
    return [...historical, ...realtimeData];
  };