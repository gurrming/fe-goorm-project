import React from 'react';
import { mockAssetData } from './mockData';

const AssetList = () => {
  return (
    <div className="flex flex-col gap-3 border-t-[0.3px] border-gray-200 pt-3">
      <p className="text-[15px] text-[#333333] px-4">보유자산 목록</p>
      <table className="w-full border-collapse bg-white text-nowrap">
        <thead>
          <tr className="border-b border-t border-gray-200 bg-[#F7F7F7]">
            <th className="px-4 py-3 text-center text-[11px] font-medium text-[#666666] border-r border-gray-200">
              보유자산
            </th>
            <th className="px-4 py-3 text-center text-[11px] font-medium text-[#666666] border-r border-gray-200">
              보유수량
            </th>
            <th className="px-4 py-3 text-center text-[11px] font-medium text-[#666666] border-r border-gray-200">
              매수평균가
            </th>
            <th className="px-4 py-3 text-center text-[11px] font-medium text-[#666666] border-r border-gray-200">
              매수금액
            </th>
            <th className="px-4 py-3 text-center text-[11px] font-medium text-[#666666] border-r border-gray-200">
              평가금액
            </th>
            <th className="px-4 py-3 text-center text-[11px] font-medium text-[#666666]">평가손익</th>
          </tr>
        </thead>
        <tbody>
          {mockAssetData.map((item, index) => (
            <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="px-2 py-3 text-xs text-[#333333] text-center border-r border-gray-200">{item.asset}</td>
              <td className="pr-2 py-3 text-xs text-[#333333] text-right border-r border-gray-200">
                {item.quantity.toLocaleString('ko-KR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 8,
                })}
              </td>
              <td className="pr-2 py-3 text-xs text-[#333333] text-right border-r border-gray-200">
                {item.averagePrice.toLocaleString('ko-KR')}
              </td>
              <td className="pr-2 py-3 text-xs text-[#333333] text-right border-r border-gray-200">
                {item.purchaseAmount.toLocaleString('ko-KR')}
              </td>
              <td className="pr-2 py-3 text-xs text-[#333333] text-right border-r border-gray-200">
                {item.evaluationAmount.toLocaleString('ko-KR')}
              </td>
              <td className="pr-2 py-3 text-xs text-[#333333] text-right border-r border-gray-200">
                {item.profitAndLoss.toLocaleString('ko-KR')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssetList;
