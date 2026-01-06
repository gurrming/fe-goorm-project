import React from 'react';
import AssetItem from './AssetItem';
import { mockAssetData } from './mockData';

const AssetList = () => {
  return (
    <div className="flex flex-col gap-3 border-t-[0.3px] border-gray-200 pt-3">
      <p className="text-[15px] text-[#333333]">보유자산 목록</p>
      <table className="w-full border-collapse bg-white text-nowrap">
        <thead>
          <tr className="border-b border-t border-gray-200 bg-[#F7F7F7]">
            <th className=" py-3 text-center text-[11px] font-medium text-[#666666] border-r border-gray-200">
              보유자산
            </th>
            <th className=" py-3 text-center text-[11px] font-medium text-[#666666] border-r border-gray-200">
              보유수량
            </th>
            <th className=" py-3 text-center text-[11px] font-medium text-[#666666] border-r border-gray-200">
              매수평균가
            </th>
            <th className=" py-3 text-center text-[11px] font-medium text-[#666666] border-r border-gray-200">
              매수금액
            </th>
            <th className=" py-3 text-center text-[11px] font-medium text-[#666666] border-r border-gray-200">
              평가금액
            </th>
            <th className=" py-3 text-center text-[11px] font-medium text-[#666666]">평가손익</th>
          </tr>
        </thead>
        <tbody>
          {mockAssetData.map((item, index) => (
            <AssetItem item={item} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssetList;
