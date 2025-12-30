const Tab = ({ handleTab, tab }: { handleTab: (tab: string) => void; tab: string }) => {
  return (
    <div className="flex gap-2 justify-between items-center border-b border-gray-200 text-[#333333]">
      <p
        className={`w-full text-sm font-bold text-center py-2 ${tab === 'buy' ? 'text-[#DD3C44]] border-b-[3px] border-[#DD3C44]' : ''}`}
        onClick={() => handleTab('buy')}
      >
        매수
      </p>
      <p
        className={`w-full text-sm font-bold text-center py-2 ${tab === 'sell' ? 'text-[#0062DF]] border-b-[3px] border-[#0062DF]' : ''}`}
        onClick={() => handleTab('sell')}
      >
        매도
      </p>
      <p
        className={`w-full text-sm font-bold text-center py-2 ${tab === 'asset' ? 'font-extrabold border-b-[3px]' : ''}`}
        onClick={() => handleTab('asset')}
      >
        보유자산
      </p>
      <p
        className={`w-full text-sm font-bold text-center py-2 ${tab === 'transaction' ? 'font-extrabold border-b-[3px]' : ''}`}
        onClick={() => handleTab('transaction')}
      >
        거래내역
      </p>
    </div>
  );
};

export default Tab;
