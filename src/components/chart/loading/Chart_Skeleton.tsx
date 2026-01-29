import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Text from '../../common/Text';

export const Chart_Skeleton = () => {
    return (
        <div className="flex flex-col">
            <div className="flex gap-2 items-center bg-white px-4 border-b border-gray-200 text-[#333333]">
                <p className="w-[50%]">{'하트비트 (HBTC-KRW)'}</p>
                <div className="w-[50%] flex gap-2 justify-between items-center ">
                    <p
                    className={`w-full text-sm font-bold text-center py-3 border-b-[3px] border-[#0062DF]`}
                    >
                    시세
                    </p>
                    <p
                    className={`w-full text-sm font-bold text-center py-3`}
                    >
                    커뮤니티
                    </p>
                </div>
            </div>
            <div className="flex items-center bg-white">
                <div className="flex flex-col px-4 w-1/2">
                    <p className="text-[20px] font-bold text-[#DD3C44]">
                    {0} <span className="text-sm">{'KRW'}</span>
                    </p>
                    <div className="flex items-center gap-3">
                        <p className={`text-sm text-[#DD3C44]`}>
                            {0}%
                        </p>
                        <p className="text-sm text-[#DD3C44]">
                            ${0}
                        </p>
                    </div>
                </div>
                <div className="flex justify-end gap-2 px-4 py-2 w-1/2">
                    <div className="flex flex-col gap-2 w-full">
                        <Text size="xs" text="고가" price={0} priceColor="red" />
                        <div className="h-[0.5px] bg-gray-200 w-full" />
                        <Text size="xs" text="저가" price={0} priceColor="blue" />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                        <Text size="xs" text="거래량" price={0} priceColor="black" type={''} />
                        <div className="h-[0.5px] bg-gray-200 w-full" />
                        <Text size="xs" text="거래대금" price={0} priceColor="black" type={'KRW'} />
                    </div>
                </div>  
            </div>
            <Skeleton count={1} width={1000} height={450} baseColor="#ffffff" highlightColor="#efefef" />
        </div>
    )
}