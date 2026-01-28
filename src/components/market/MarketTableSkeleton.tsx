import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const COIN_MOCK_DATA: { categoryName: string; symbol: string }[] = [
  { categoryName: '비트코인', symbol: 'BTC' },
  { categoryName: '이더리움', symbol: 'ETH' },
  { categoryName: '리플', symbol: 'XRP' },
  { categoryName: '솔라나', symbol: 'SOL' },
  { categoryName: '에이다', symbol: 'ADA' },
  { categoryName: '도지코인', symbol: 'DOGE' },
  { categoryName: '트론', symbol: 'TRX' },
  { categoryName: '폴카닷', symbol: 'DOT' },
  { categoryName: '체인링크', symbol: 'LINK' },
  { categoryName: '폴리곤', symbol: 'MATIC' },
  { categoryName: '시바이누', symbol: 'SHIB' },
  { categoryName: '라이트코인', symbol: 'LTC' },
  { categoryName: '코스모스', symbol: 'ATOM' },
  { categoryName: '이오스', symbol: 'EOS' },
  { categoryName: '파일코인', symbol: 'FIL' },
  { categoryName: '알고랜드', symbol: 'ALGO' },
];

export default function MarketTableSkeleton() {
  return (
    <div className="w-full">
      {COIN_MOCK_DATA.map((coin, index) => (
        <div key={index} className="grid grid-cols-[1.5fr_1.2fr_1fr_1.3fr] border-b border-gray-200 px-4 py-2">
          <div className="text-xs min-w-0">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 flex items-center justify-center text-primary-500 shrink-0">
                <FontAwesomeIcon icon={faStarRegular} className="text-xs" />
              </span>
              <div className="flex flex-col min-w-0">
                <span className="text-[13px] font-semibold text-primary-100">{coin.categoryName}</span>
                <span className="text-[11px] text-primary-300">{coin.symbol}/(KRW)</span>
              </div>
            </div>
          </div>
          <div className="text-right text-primary-300 text-xs font-semibold min-w-[90px]">–</div>
          <div className="text-right text-primary-300 text-xs font-semibold min-w-[80px]">–</div>
          <div className="text-right text-primary-100 text-xs font-semibold min-w-[100px]">0</div>
        </div>
      ))}
    </div>
  );
}
