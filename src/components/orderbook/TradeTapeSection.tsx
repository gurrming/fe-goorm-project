import { mockTradeTapeData } from './mockData';
import { formatNumber } from '../../lib/price';

export default function TradeTapeSection() {
  return (
    <div className="bg-white p-4">
      {/* 체결강도 헤더 */}

      {/* 테이블 헤더 */}
      <div className="grid grid-cols-2 gap-2 pb-2 mb-2">
        <div className="text-[10px] text-gray-600 text-center">체결가</div>
        <div className="text-[10px] text-gray-600 text-center border-l border-gray-300">체결액</div>
      </div>

      {/* 체결 내역 리스트 */}
      <div className="space-y-1 max-h-96">
        {mockTradeTapeData.map((item, index) => (
          <div key={index} className="grid grid-cols-2 gap-2 text-[10px] py-1">
            <div className="text-gray-900 text-right">{formatNumber(item.price)}</div>
            <div className={`text-right ${item.isBuy ? 'text-blue-500' : 'text-red-500'}`}>
              {formatNumber(item.amount)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
