import SettledItem from './SettledItem';
import { useGetSettledData } from '../../../../api/transaction/useGetSettledData';
import type { TSettledData } from '../../../../types/transaction';

const Settled = () => {
  const { data } = useGetSettledData();
  console.log('채결 내역 : ', data);

  return (
    <table className="w-full border-collapse bg-white">
      <thead>
        <tr className="border-b border-t border-gray-200 bg-[#F7F7F7]">
          <th className="py-3 text-center text-[11px] font-medium text-[#666666] border-r border-gray-200">주문시간</th>
          <th className="py-3 text-center text-[11px] font-medium text-[#666666] border-r border-gray-200">구분</th>
          <th className="py-3 text-center text-[11px] font-medium text-[#666666] border-r border-gray-200">
            <div className="flex flex-col">
              <span>체결가격</span>
            </div>
          </th>
          <th className="py-3 text-center text-[11px] font-medium text-[#666666]">체결수량</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((item: TSettledData, index: number) => (
          <SettledItem item={item} index={index} />
        ))}
      </tbody>
    </table>
  );
};

export default Settled;
