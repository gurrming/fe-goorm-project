import OrderBookGridLayout from './OrderBookGridLayout';

function SkeletonBlock({ className }: { className: string }) {
  return <div className={`bg-gray-200/80 rounded ${className}`} />;
}

function OrderBookSkeletonRow({ isSell, barWidthPercent }: { isSell: boolean; barWidthPercent: number }) {
  const grid = isSell ? 'grid-cols-[1fr_4fr_5fr]' : 'grid-cols-[5fr_4fr_1fr]';
  const boxColor = isSell ? 'bg-[#ebf2ff]' : 'bg-[#fff2f2]';

  return (
    <div className={`grid ${grid} px-2 text-xs border-t border-white w-full items-center justify-center ${boxColor}`}>
      {/* 매수 / 매도 가격 영역 스켈레톤 */}
      <div className="flex flex-col itㅑems-center justify-center py-2">
        {!isSell ? (
          <div className="flex items-center gap-2">
            <SkeletonBlock className="h-3 w-14" />
            <SkeletonBlock className="h-3 w-10" />
          </div>
        ) : (
          <div className="h-3 w-1" />
        )}
      </div>

      {/* Bar Chart 영역 스켈레톤 */}
      <div className="relative flex items-center justify-center min-h-6 text-[11px] w-full h-full border-white border-x py-4">
        <div
          className={`absolute top-0 bottom-0 pointer-events-none ${
            isSell ? 'right-0 bg-[#cee4ff]' : 'left-0 bg-[#ffd4d5]'
          }`}
          style={{ width: `${barWidthPercent}%` }}
        />
        <SkeletonBlock className="relative z-5 h-3 w-10" />
      </div>

      <div className="flex flex-col items-center justify-center py-2">
        {isSell ? (
          <div className="flex items-center gap-2">
            <SkeletonBlock className="h-3 w-14" />
            <SkeletonBlock className="h-3 w-10" />
          </div>
        ) : (
          <div className="h-3 w-1" />
        )}
      </div>
    </div>
  );
}

function MarketSummarySkeleton() {
  return (
    <div className="bg-gray-50 p-2 flex flex-col justify-end h-full">
      <div className="mt-auto space-y-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex justify-between items-center">
            <SkeletonBlock className="h-3 w-14" />
            <div className="flex flex-col items-end gap-2">
              <SkeletonBlock className="h-3 w-16" />
              {index === 1 && <SkeletonBlock className="h-3 w-10" />}
              {index === 2 && <SkeletonBlock className="h-3 w-14" />}
            </div>
          </div>
        ))}

        <div className="border-t border-gray-300 pt-3 space-y-3">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="flex justify-between items-center">
              <SkeletonBlock className="h-3 w-14" />
              <div className="flex flex-col items-end gap-2">
                <SkeletonBlock className="h-3 w-16" />
                <SkeletonBlock className="h-3 w-12" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TradeTapeSkeleton() {
  return (
    <div className="bg-white p-4">
      <div className="flex justify-between items-center pb-2 mb-2 border-b border-gray-300">
        <SkeletonBlock className="h-3 w-12" />
        <SkeletonBlock className="h-3 w-14" />
      </div>

      <div className="grid grid-cols-2 gap-2 pb-2 mb-2">
        <div className="flex justify-center">
          <SkeletonBlock className="h-3 w-10" />
        </div>
        <div className="flex justify-center border-l border-gray-300">
          <SkeletonBlock className="h-3 w-10" />
        </div>
      </div>

      <div className="space-y-2">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="grid grid-cols-2 gap-2">
            <div className="flex justify-end">
              <SkeletonBlock className="h-3 w-16" />
            </div>
            <div className="flex justify-end">
              <SkeletonBlock className="h-3 w-12" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function OrderBookSkeleton() {
  const sellBarWidths = [72, 58, 86, 45, 63, 28, 80, 54, 36, 68, 42, 60];
  const buyBarWidths = [66, 52, 84, 40, 61, 30, 78, 49, 34, 64, 44, 57];

  return (
    <OrderBookGridLayout>
      <div className="col-span-2 flex flex-col-reverse">
        {sellBarWidths.map((width, index) => (
          <OrderBookSkeletonRow key={`sell-${index}`} isSell={true} barWidthPercent={width} />
        ))}
      </div>

      <MarketSummarySkeleton />

      <TradeTapeSkeleton />

      <div className="col-span-2 flex flex-col">
        {buyBarWidths.map((width, index) => (
          <OrderBookSkeletonRow key={`buy-${index}`} isSell={false} barWidthPercent={width} />
        ))}
      </div>
    </OrderBookGridLayout>
  );
}
