import type { TabKey } from '../../types/market';

type MarketTabsProps = {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
};

export default function MarketTabs({ activeTab, onTabChange }: MarketTabsProps) {
  const tabArray = (key: TabKey) =>
    `w-full text-sm font-bold text-center py-3 cursor-pointer ${
      activeTab === key ? 'text-primary-900 border-b-[3px] border-primary-900' : 'text-primary-100'
    }`;

  return (
    <div className="flex justify-between items-center border-b border-gray-200">
      <p className={tabArray('krw')} onClick={() => onTabChange('krw')}>
        원화
      </p>
      <p className={tabArray('holding')} onClick={() => onTabChange('holding')}>
        보유
      </p>
      <p className={tabArray('interest')} onClick={() => onTabChange('interest')}>
        관심
      </p>
    </div>
  );
}
