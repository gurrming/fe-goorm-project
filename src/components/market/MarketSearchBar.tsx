type MarketSearchBarProps = {
  searchKeyword: string;
  onSearchKeywordChange: (keyword: string) => void;
};

export default function MarketSearchBar({ searchKeyword, onSearchKeywordChange }: MarketSearchBarProps) {
  return (
    <div className="px-4 pt-3 pb-2 border-b border-gray-200">
      <input
        value={searchKeyword}
        onChange={(e) => onSearchKeywordChange(e.target.value)}
        className="w-full text-sm px-3 py-2 border border-gray-200 rounded-md outline-none focus:border-primary-900"
        placeholder="코인명 / 심볼검색"
      />
    </div>
  );
}
