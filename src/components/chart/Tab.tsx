import React from 'react';

const Tab = ({ title, tab, handleTab }: { title: string; tab: string; handleTab: (tab: string) => void }) => {
  return (
    <div className="flex gap-2 items-center bg-white px-4 border-b border-gray-200 text-[#333333]">
      <p className="w-[50%]">{title}</p>
      <div className="w-[50%] flex gap-2 justify-between items-center ">
        <p
          className={`w-full text-sm font-bold text-center py-2 ${tab === 'price' ? 'border-b-[3px] border-[#0062DF]' : ''}`}
          onClick={() => handleTab('price')}
        >
          시세
        </p>
        <p
          className={`w-full text-sm font-bold text-center py-2 ${tab === 'community' ? 'font-extrabold border-b-[3px]' : ''}`}
          onClick={() => handleTab('community')}
        >
          커뮤니티
        </p>
      </div>
    </div>
  );
};

export default Tab;
