import { memo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useGetCategoryInfo } from '../../api/useGetCategoryInfo';
import { useTicker } from '../../hooks/websocket/useTicker';
import { formatChangePricePercentage, formatInteger, formatNumber } from '../../lib/price';
import useCategoryIdStore from '../../store/useCategoryId';
import { useTickerStore } from '../../store/websocket/useTickerStore';

// 거래량, 거래 대금, 당일 고가/저가
const PanelItem = memo(function PanelItem({
  label,
  value,
  valueColor = 'text-primary-100',
  text,
  changeRate,
  borderTop = false,
}: {
  label: string;
  value: string;
  valueColor?: string;
  text?: string;
  changeRate?: { text: string; textStyle: string };
  borderTop?: boolean;
}) {
  return (
    <div className={`flex justify-between items-center ${borderTop ? 'border-t border-gray-300 pt-3' : ''}`}>
      <div className="text-[10px] text-primary-300">{label}</div>
      <div className="flex flex-col items-end">
        <div className={`text-[10px] ${valueColor}`}>{value}</div>
        {changeRate ? (
          <div className={`text-[10px] ${changeRate.textStyle}`}>{changeRate.text}%</div>
        ) : text ? (
          <div className="text-[10px] text-primary-500">{text}</div>
        ) : null}
      </div>
    </div>
  );
});

// 전일 종가 REST API에서 받은 값이라 웹소켓 데이터로 인해 렌더링 되지 않도록
const PreviousClosePriceRow = memo(function PreviousClosePriceRow({ categoryId }: { categoryId: number }) {
  const { data: categoryInfo } = useGetCategoryInfo(categoryId);
  const previousClose = categoryInfo?.openPrice ?? 0;
  return <PanelItem label="전일종가" value={formatNumber(previousClose)} />;
});

// 거래량/거래대금만 구독, 고가/저가 티커가 자주 와도 여기는 volume/amount 바뀔 때만 리렌더
const VolumeAmountRow = memo(function VolumeAmountRow({ categoryId }: { categoryId: number }) {
  const { data: categoryInfo } = useGetCategoryInfo(categoryId);
  const { volume: tickerVolume, amount: tickerAmount } = useTickerStore(
    useShallow((state) => {
      const volumeAmount = state.tickerByCategoryId[categoryId];
      return { volume: volumeAmount?.volume, amount: volumeAmount?.amount };
    }),
  );
  const volume = tickerVolume ?? categoryInfo?.accVolume ?? 0;
  const amount = tickerAmount ?? categoryInfo?.accAmount ?? 0;
  return (
    <>
      <PanelItem label="거래량" value={formatNumber(volume)} text={categoryInfo?.symbol} />
      <PanelItem label="거래대금" value={formatInteger(amount)} text="(최근24시간)" />
    </>
  );
});

// 당일고가/저가만 구독. 거래량/거래대금 티커만 와도 여기는 high/low 바뀔 때만 리렌더
const DailyHighLowRow = memo(function DailyHighLowRow({ categoryId }: { categoryId: number }) {
  const { data: categoryInfo } = useGetCategoryInfo(categoryId);
  const { high: tickerHigh, low: tickerLow } = useTickerStore(
    useShallow((state) => {
      const highLow = state.tickerByCategoryId[categoryId];
      return { high: highLow?.high, low: highLow?.low };
    }),
  );
  const high = tickerHigh ?? categoryInfo?.dailyHigh ?? 0;
  const low = tickerLow ?? categoryInfo?.dailyLow ?? 0;
  const previousClose = categoryInfo?.openPrice ?? 0;
  const highChangeRate =
    previousClose !== 0 ? ((high - previousClose) / previousClose) * 100 : (categoryInfo?.changeRate ?? 0);
  const lowChangeRate =
    previousClose !== 0 ? ((low - previousClose) / previousClose) * 100 : (categoryInfo?.changeRate ?? 0);
  const highRate = formatChangePricePercentage(highChangeRate);
  const lowRate = formatChangePricePercentage(lowChangeRate);
  return (
    <>
      <PanelItem
        label="당일고가"
        value={formatNumber(high)}
        valueColor={highRate.textStyle}
        changeRate={highRate}
        borderTop
      />
      <PanelItem label="당일저가" value={formatNumber(low)} valueColor={lowRate.textStyle} changeRate={lowRate} />
    </>
  );
});

export default function MarketSummaryPanel() {
  const categoryId = useCategoryIdStore((state) => state.categoryId);

  useTicker([categoryId]);

  return (
    <div className="bg-gray-50 p-2 flex flex-col justify-end h-full">
      <div className="mt-auto space-y-3">
        <PreviousClosePriceRow categoryId={categoryId} />
        <VolumeAmountRow categoryId={categoryId} />
        <DailyHighLowRow categoryId={categoryId} />
      </div>
    </div>
  );
}
